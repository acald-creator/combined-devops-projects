import { Router, Request, Response, NextFunction } from "express";
import { User } from "../models/Users";
import * as c from "../../../../config/config";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

const router: Router = Router();

/* Generate the password */
async function generatePassword(plainTextPassword: string): Promise<string> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(plainTextPassword, salt);
}
/* Compare the password */
async function comparePasswords(
  plainTextPassword: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hash);
}

/* Generate the JWT token */
function generateJWT(user: User): string {
  console.log("generateJWT");
  return jwt.sign(user.short(), c.config.jwt.secret);
}

/* Authorize the user */
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).send({
      message: "No authorization headers",
    });
  }
  const tokenBearer = req.headers.authorization.split(" ");
  if (tokenBearer.length !== 2) {
    return res.status(401).send({
      message: "Malformed token",
    });
  }

  const token = tokenBearer[1];
  return jwt.verify(token, c.config.jwt.secret, (err, decoded) => {
    if (err) {
      return res.status(500).send({
        auth: false,
        message: "Failed to authenticate",
      });
    }
    return next();
  });
}

/* Configure the routing */
router.get("/", async (req: Request, res: Response) => {
  res.send("auth");
});

router.get(
  "/verification",
  requireAuth,
  async (req: Request, res: Response) => {
    return res.status(200).send({
      auth: true,
      message: "Authenticated",
    });
  }
);

export const AuthRouter: Router = router;
