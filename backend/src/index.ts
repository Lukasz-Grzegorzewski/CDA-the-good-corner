import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { dataSource } from "./datasource";

import { CategoriesController } from "./controllers/CategoriesController";
import { AdsController } from "./controllers/AdsController";
import { TagsController } from "./controllers/TagsController";

const app = express();
app.use(express.json());
const port: number = 3000;

//TEST
app.get("/test1", async (req: Request, res: Response) => {
  res.status(200).json({ messagge: "test" });
});

/* ERROR HANDLING*/
function asyncController(controller: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next)
    } catch (error) {
      console.log(error);
      res.sendStatus(500)
    }
  }
}

/* ADS */
const adsController = new AdsController();
app.get("/ads", asyncController(adsController.getAll));
app.get("/ads/:id", asyncController(adsController.getOne));
app.get("/categories/:id/ads", asyncController(adsController.getAdsByCategoryId));
app.post("/ads", asyncController(adsController.createOne));
app.patch("/ads/:id", asyncController(adsController.patchOne));
app.put("/ads/:id", asyncController(adsController.updateOne));
app.delete("/ads/:id", asyncController(adsController.deleteOne));

/* CATEGORIES */
const categoriesController = new CategoriesController();
app.get("/categories", asyncController(categoriesController.getAll));
app.get("/categories/:id", asyncController(categoriesController.getOne));
app.post("/categories", asyncController(categoriesController.createOne));
app.patch("/categories/:id", asyncController(categoriesController.patchOne));
app.put("/categories/:id", asyncController(categoriesController.updateOne));
app.delete("/categories/:id", asyncController(categoriesController.deleteOne));

/* TAGS */
const tagsController = new TagsController();
app.get("/tags", asyncController(tagsController.getAll));
app.get("/tags/:id", asyncController(tagsController.getOne));
app.post("/tags", asyncController(tagsController.createOne));
app.patch("/tags/:id", asyncController(tagsController.patchOne));
app.put("/tags/:id", asyncController(tagsController.updateOne));
app.delete("/tags/:id", asyncController(tagsController.deleteOne));

app.listen(port, async () => {
  await dataSource.initialize();
  console.warn("----------------------------------");
  console.warn(`Server is listening on port: ${port}`);
});
