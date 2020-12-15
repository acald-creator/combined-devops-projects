/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import {
  Router, Request, Response, NextFunction,
} from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as EmailValidator from 'email-validator';
import User from '../models/Users';
import * as c from '../../../../config/config';

const router: Router = Router();

/* Generate the password */
async function generatePassword(plainTextPassword: string): Promise<string> {
// @TODO Use Bcrypt to generate salted hashed passwords
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainTextPassword, salt);
  } catch (e) {
    return 'caught';
  }
}
/* Compare the password */
async function comparePasswords(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
// @TODO Use Bcrypt to compare the password to the salted hashed password
  try {
    return await bcrypt.compare(plainTextPassword, hash);
  } catch (e) {
    return false;
  }
}
/* Generate the JWT token */
function generateJWT(user: User): string {
  // @TODO Use jwt to generate a new JWT Payload
  return jwt.sign(user.short(), c.default.jwt.secret);
}
/* Authorize the user */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({
      message: 'No authorization headers',
    });
  }
  const tokenBearer = req.headers.authorization.split(' ');
  if (tokenBearer.length !== 2) {
    return res.status(401).send({
      message: 'Malformed token',
    });
  }
  const token = tokenBearer[1];
  return jwt.verify(token, c.default.jwt.secret, (err) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: 'Failed to authenticate',
      });
    }
    return next();
  });
}
/* Configure the routing */
router.get('/', async (req: Request, res: Response) => {
  res.send('auth');
});
/* Once authorized, the login will redirect to verification */
router.get(
  '/verification',
  requireAuth,
  async (req: Request, res: Response) => res.status(200).send({
    auth: true,
    message: 'Authenticated',
  }),
);
/* Regsiter a new user */
router.post('/', async (req: Request, res: Response) => {
  /* Check that an email account is valid and registered */
  const { email } = req.body;
  /* Check the email password for validity */
  const plainTextPassword = req.body.password;
  /* Check that a user exists */
  const user = await User.findByPk(email);
  /* Wait on the generated password from the plaintext */
  const passwordHash = await generatePassword(plainTextPassword);
  /* User's attributes consist of email and password hash */
  const newUser = new User({ email, passwordHash });
  /* Generate the JWT token for the new user, once the user registers */
  const savedUser = await newUser.save();
  const jwtSaved = generateJWT(savedUser);

  try {
    if (user) {
      return res.status(422).send({
        auth: false,
        message: 'User may already exist. Try again.',
      });
    }
    if (!email || !EmailValidator.validate(email)) {
      return res.status(400).send({
        auth: false,
        message: 'Email address is required or email address may already exist.',
      });
    }
    if (!plainTextPassword) {
      return res.status(400).send({
        auth: false,
        message: 'Email address or password may be incorrect.',
      });
    }
  } finally { /* continue regardless of error */ }

  res.status(201).send({
    token: jwtSaved,
    user: savedUser.short(),
  });
});
/* Check login for user */
router.post('/login', async (req: Request, res: Response) => {
  const { email } = req.body;
  const { password } = req.body;
  if (!email || !EmailValidator.validate(email)) {
    return res.status(400).send({
      auth: false,
      message: 'Email is required or malformed',
    });
  }
  if (!password) {
    return res.status(400).send({
      auth: false,
      message: 'Password is required',
    });
  }
  const user = await User.findByPk(email);
  if (!user) {
    return res.status(401).send({
      auth: false,
      message: 'Unauthorized',
    });
  }
  const authValid = await comparePasswords(password, user.passwordHash);
  if (!authValid) {
    return res.status(401).send({
      auth: false,
      message: 'Unauthorized',
    });
  }
  const jwtNew = generateJWT(user);
  res.status(200).send({
    auth: true,
    token: jwtNew,
    user: user.short(),
  });
});

const AuthRouter: Router = router;
export { AuthRouter as default };
