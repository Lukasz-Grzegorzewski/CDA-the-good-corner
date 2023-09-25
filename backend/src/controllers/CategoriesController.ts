import { Request, Response } from "express";
import { Controller } from ".";
import { Category } from "../entities/Category";

export class CategoriesController extends Controller {
  getAll = async (req: Request, res: Response) => {
    const categories = await Category.find();

    if (categories.length > 0) return res.status(200).json(categories);
    else res.sendStatus(404);
  };

  getOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await Category.findBy({ id });

    if (category.length > 0) return res.status(200).json(category);
    else res.sendStatus(404);
  };

  createOne = async (req: Request, res: Response) => {
    const inputs = req.body;
    const category = await new Category();

    if (category) Object.assign(category, inputs);

    const { id } = await category.save();

    if (id) return res.status(200).json({ id });
    else res.sendStatus(422);
  };

  patchOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const inputs = req.body;

    const category = await Category.findOneBy({ id });
    if (category) {
      Object.assign(category, inputs, { id: category.id });
      const status = await category.save();

      if (status) res.sendStatus(204);
      else res.sendStatus(500);
    } else res.sendStatus(404);

    // ALTERNATIVE (SQL aproach)
    // const category = await Category.update({ id }, { ...inputs });
    // if (category) res.sendStatus(204);
    // else res.sendStatus(404);
  };

  updateOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const inputs = req.body;

    const [category] = await Category.findBy({ id });

    if (category) {
      const newCategory = new Category();
      Object.assign(newCategory, inputs, { id: category.id });
      const status = await newCategory.save();

      if (status) res.sendStatus(204);
      else res.sendStatus(500);
    } else res.sendStatus(404);
  };

  deleteOne = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const category = await Category.findOneBy({ id });

    if (category) {
      const removedCategory = await category.remove();

      if (removedCategory) res.sendStatus(204);
      else res.sendStatus(500);
    } else {
      res.sendStatus(404);
    }
  };
}
