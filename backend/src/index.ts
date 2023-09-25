import "reflect-metadata";
import express, { Request, Response } from "express";
import { dataSource } from "./datasource";

import { CategoriesController } from "./controllers/CategoriesController";
import { AdsController } from "./controllers/AdsController";
import { TagsController } from "./controllers/TagsController";

const app = express();
app.use(express.json());
const port: number = 3000;

//TEST
app.get("/test1", async (req: Request, res: Response) => {
  res.status(200).json({messagge: "test"});
});


/* ADS */
const adsController = new AdsController();
app.get("/ads", adsController.getAll)
app.get("/ads/:id", adsController.getOne)
app.get("/categories/:id/ads", adsController.getAdsByCategoryId)
app.post("/ads", adsController.createOne)
app.patch("/ads/:id", adsController.patchOne)
app.put("/ads/:id", adsController.updateOne)
app.delete("/ads/:id", adsController.deleteOne)

/* CATEGORIES */
const categoriesController = new CategoriesController();
app.get("/categories", categoriesController.getAll)
app.get("/categories/:id", categoriesController.getOne)
app.post("/categories", categoriesController.createOne)
app.patch("/categories/:id", categoriesController.patchOne)
app.put("/categories/:id", categoriesController.updateOne)
app.delete("/categories/:id", categoriesController.deleteOne)

/* TAGS */
const tagsController = new TagsController();
app.get("/tags", tagsController.getAll)
app.get("/tags/:id", tagsController.getOne)
app.post("/tags", tagsController.createOne)
app.patch("/tags/:id", tagsController.patchOne)
app.put("/tags/:id", tagsController.updateOne)
app.delete("/tags/:id", tagsController.deleteOne)

app.listen(port, async () => {
  await dataSource.initialize();
  console.warn("----------------------------------");
  console.warn(`Server is listening on port: ${port}`);
});
