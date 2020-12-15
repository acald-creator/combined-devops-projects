import { Router, Request, Response } from 'express';
import { FeedItem } from '../models/FeedItem';
import { requireAuth } from '../../users/routes/auth.router';
import * as AWS from '../../../../aws';

const router: Router = Router();
/* Retrieve all feed items */
router.get('/', async (req: Request, res: Response) => {
  const items = await FeedItem.findAndCountAll({ order: [['id', 'DESC']] });
  items.rows.map((item) => {
    if (item.url) {
      item.url = AWS.getGetSignedUrl(item.url);
    }
  });
  res.send(items);
});
/* Retrieve a specific item */
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await FeedItem.findByPk(id);
  res.send(item);
});
/* Update a specific item */
router.patch('/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    res.send(500).send('Not implemented');
  });
/* Get a signed url to put a new item into the S3 bucket */
router.get('/signed-url/:fileName',
  requireAuth,
  async (req: Request, res: Response) => {
    const { fileName } = req.params;
    const url = AWS.getPutSignedUrl(fileName);
    res.status(201).send({ url });
  });

router.post('/',
  requireAuth,
  async (req: Request, res: Response) => {
    const { caption } = req.body;
    const fileName = req.body.url;
    /* Check if the caption is valid */
    if (!caption) {
      return res.status(400).send({ message: 'Caption is required or malformed' });
    }
    /* Check if the filename is valid */
    if (!fileName) {
      return res.status(400).send({ message: 'File url is required' });
    }

    const item = new FeedItem({
      caption,
      url: fileName,
    });

    const savedItem = await item.save();

    savedItem.url = AWS.getGetSignedUrl(savedItem.url);
    res.status(201).send(savedItem);
  });

export const FeedRouter: Router = router;
