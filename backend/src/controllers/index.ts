import { Request, Response } from "express";

export class Controller {
  getAll = (req: Request, res: Response) => {
    console.warn("getAll method in Controller");
    this.notImplemented(req, res);
  };

  getOne = (req: Request, res: Response) => {
    console.warn("getOne method in Controller");
    this.notImplemented(req, res);
  };

  createOne = (req: Request, res: Response) => {
    console.warn("createOne method in Controller");
    this.notImplemented(req, res);
  };

  patchOne = (req: Request, res: Response) => {
    console.warn("patchOne method in Controller");
    this.notImplemented(req, res);
  };

  updateOne = (req: Request, res: Response) => {
    console.warn("updateOne method in Controller");
    this.notImplemented(req, res);
  };

  deleteOne = (req: Request, res: Response) => {
    console.warn("deleteOne method in Controller");
    this.notImplemented(req, res);
  };
  notImplemented = (req: Request, res: Response) => {
    res.status(404).json({ message: "This controller doesn't exists" });
  };

}
