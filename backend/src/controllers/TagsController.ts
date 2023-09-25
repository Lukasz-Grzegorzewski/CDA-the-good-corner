import { Request, Response } from "express";
import { Controller } from ".";
import { Tag } from "../entities/Tag";

export class TagsController extends Controller {
  getAll = async (req: Request, res: Response) => {
    const tags = await Tag.find();

    if (tags.length > 0) return res.status(200).json(tags);
    else res.sendStatus(404);
  };

  getOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const tags = await Tag.findBy({ id });

    if (tags.length > 0) return res.status(200).json(tags);
    else res.sendStatus(404);
  };

  createOne = async (req: Request, res: Response) => {
    const inputs = req.body;
    const tag = await new Tag();

    if (tag) Object.assign(tag, inputs);

    const { id } = await tag.save();

    if (id) return res.status(200).json({ id });
    else res.sendStatus(422);
  };

  patchOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const inputs = req.body;

    const tag = await Tag.findOneBy({ id });
    if (tag) {
      Object.assign(tag, inputs, { id: tag.id });
      const status = await tag.save();

      if (status) res.sendStatus(204);
      else res.sendStatus(500);
    } else res.sendStatus(404);

    // ALTERNATIVE (SQL aproach)
    // const tag = await Tag.update({ id }, { ...inputs });
    // if (tag) res.sendStatus(204);
    // else res.sendStatus(404);
  };

  updateOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const inputs = req.body;

    const [tag] = await Tag.findBy({ id });

    if (tag) {
      const newTag = new Tag();
      Object.assign(newTag, inputs, { id: tag.id });
      const status = await newTag.save();

      if (status) res.sendStatus(204);
      else res.sendStatus(500);
    } else res.sendStatus(404);
  };

  deleteOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const tag = await Tag.findOneBy({ id });

    if (tag) {
      const removedTag = await tag.remove();

      if (removedTag) res.sendStatus(204);
      else res.sendStatus(500);
    } else {
      res.sendStatus(404);
    }
  };
}
