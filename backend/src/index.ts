import express from "express";
import { Request, Response } from "express";
import db from "./db";

import {
  getAllAds,
  getAllAdsByCategory,
  getAdById,
  getAllCategories,
  getCategoryById,
} from "./promises";
import type { Ad, Category } from "./types";

const app = express();
app.use(express.json());
const port: number = 3000;

//TEST
app.get("/test", (req: Request, res: Response) => {
  db.all("SELECT * FROM Ad", (err, rows) => {
    res.send(rows);
  });
});

//ADS
app.get("/ads", async (req: Request, res: Response) => {
  try {
    const resultAds: Ad[] = await getAllAds();
    const {
      page,
      limit,
      "sort-by": sortBy,
      "sort-desc": sortdesc,
      "filter-field-s": filterFieldS,
      "filter-field-n": filterFieldN,
      "filter-word": filterWord,
      "filter-price-start": filterPriceStart,
      "filter-price-end": filterPriceEnd,
    } = req.query;

    //FILTER STRING
    if (filterFieldS && filterWord) {
      for (let i = resultAds.length - 1; i >= 0; i--) {
        const obj = resultAds[i];

        const filterFieldString: string = filterFieldS as string;
        const filterWordString: string = filterWord as string;

        if (
          !(filterFieldString in obj) ||
          typeof obj[filterFieldString] !== "string" ||
          !(obj[filterFieldString] as string).includes(filterWordString)
        ) {
          resultAds.splice(i, 1);
        }
      }
    }

    //FILTER NUMBER
    if (filterFieldN && (filterPriceStart || filterPriceEnd)) {
      for (let i = resultAds.length - 1; i >= 0; i--) {
        const obj = resultAds[i];

        const filterFieldNumber: string = filterFieldN as string;
        const filterPriceStartNumber: number = Number(
          filterPriceStart
        ) as number;
        const filterPriceEndNumber: number = Number(filterPriceEnd) as number;

        if (
          !(filterFieldNumber in obj) ||
          typeof obj[filterFieldNumber] !== "number" ||
          (!filterPriceStart &&
            filterPriceEnd &&
            (obj[filterFieldNumber] as number) > filterPriceEndNumber) ||
          (!filterPriceEnd &&
            filterPriceStart &&
            (obj[filterFieldNumber] as number) < filterPriceStartNumber) ||
          (filterPriceEnd &&
            filterPriceStart &&
            (filterPriceStartNumber > (obj[filterFieldNumber] as number) ||
              filterPriceEndNumber < (obj[filterFieldNumber] as number)))
        ) {
          resultAds.splice(i, 1);
        }
      }
    }

    //TODO
    //SORTING
    if (sortBy) {
      const allowedFields: string[] = [
        "title",
        "price",
        "location",
        "createdAt",
      ];
      resultAds.sort((a: Ad, b: Ad) => {
        if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
          return 1;
        } else if (b.title.toLocaleLowerCase() > a.title.toLocaleLowerCase()) {
          return -1;
        } else {
          return 0;
        }
      });
      if (sortdesc === "true") {
        resultAds.reverse();
      }
    }

    //PAGINATION
    if (limit) {
      const limitNumber: number = Number(limit) as number;

      const lengtharray: number = resultAds.length;
      const pages: number = Math.ceil(lengtharray / limitNumber);

      if (page && Number(page) <= pages) {
        const pageNumber: number = Number(page) as number;

        if (pageNumber === pages) {
          resultAds.splice(0, (pageNumber - 1) * limitNumber);
        } else if (pageNumber === 1) {
          resultAds.splice(limitNumber);
        } else {
          resultAds.splice(0, (pageNumber - 1) * limitNumber);
          resultAds.splice(limitNumber);
        }
      } else {
        resultAds.splice(limitNumber);
      }
    }

    res.status(200).send(resultAds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ succes: false, message: "GET_ALL ADS !" });
  }
});

app.get("/ads/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const ad: Ad = await getAdById(id);
    res.status(200).send(ad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ succes: false, message: "GET_BY_ID AD !" });
  }
});

app.get("/categories/:id/ads", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const adsWithCategoryArr = await getAllAdsByCategory(id);
    res.status(200).send(adsWithCategoryArr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ succes: false, message: "GET_ALL CATEGORIES !" });
  }
});

app.post("/ads", (req: Request, res: Response) => {
  try {
    const { title, description, owner, price, picture, location, category_id } =
      req.body;
    const createdAt = new Date().toJSON();

    db.run(
      "INSERT INTO Ad(title, description, owner, price, picture, location, category_id, createdAt) VALUES($title, $description, $owner, $price, $picture, $location, $category_id, $createdAt)",
      {
        $title: title,
        $description: description,
        $owner: owner,
        $price: price,
        $picture: picture,
        $location: location,
        $category_id: category_id,
        $createdAt: createdAt,
      },
      (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        }
        res.sendStatus(204);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ succes: false, message: "POST AD !" });
  }
});

app.patch("/ads/:id", (req: Request, res: Response) => {
  try {
    const idAd = req.params.id;
    const updateObj = req.body;

    let query: string = "UPDATE Ad SET ";
    const allowedFields = [
      "title",
      "description",
      "owner",
      "price",
      "picture",
      "location",
      "category_id",
    ];
    const fields = Object.keys(req.body);

    for (const field of fields) {
      if (allowedFields.includes(field) === true) {
        query += field + " = ?, ";
      } else {
        return res.status(400).json({ message: `Field ${field} not allowed` });
      }
    }
    const queryWithoutLastComa = query.slice(0, query.length - 2);
    query = queryWithoutLastComa + " WHERE id = ? ;";

    db.run(query, Object.values(updateObj).concat([idAd]), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error occured");
      } else {
        res.status(204).send();
      }
    });
  } catch (error) {
    res.status(500).json({ succes: false, message: "PATCH AD !" });
  }
});

app.delete("/ads/:idAd", (req: Request, res: Response) => {
  try {
    const id = req.params.idAd;
    let sql: string = "DELETE FROM Ad";
    sql += ` WHERE id = ?;`;
    const options: string[] = [id];

    db.run(sql, options, (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.sendStatus(204);
    });
  } catch (error) {
    res.status(500).json({ succes: false, message: "DELETE AD !" });
  }
});

//CATEGORIES
app.get("/categories", async (req: Request, res: Response) => {
  try {
    const categoriesArr = await getAllCategories();
    res.status(200).send(categoriesArr);
  } catch (error) {
    console.error(error);
    res.status(500).json({ succes: false, message: "GET_ALL CATEGORIES !" });
  }
});

app.get("/categories/:id", async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const category: Category = await getCategoryById(id);
    res.status(200).send(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ succes: false, message: "GET_BY_ID CATEGORY!" });
  }
});

app.post("/categories", (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    db.run(
      "INSERT INTO Category(name) VALUES($name)",
      {
        $name: name,
      },
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error occured");
        }
        res.sendStatus(204);
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ succes: false, message: "POST CATEGORY!" });
  }
});

app.patch("/categories/:id", (req: Request, res: Response) => {
  try {
    const idCategory = req.params.id;
    const updateObj = req.body;

    let query: string = "UPDATE Category SET ";
    const allowedFields = ["name"];
    const fields = Object.keys(updateObj);

    for (const field of fields) {
      if (allowedFields.includes(field) === true) {
        query += field + " = ?, ";
      } else {
        return res.status(400).json({ message: `Field ${field} not allowed` });
      }
    }
    const queryWithoutLastComa = query.slice(0, query.length - 2);
    query = queryWithoutLastComa + " WHERE id = ? ;";

    db.run(query, Object.values(updateObj).concat([idCategory]), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error occured");
      } else {
        res.status(204).send();
      }
    });
  } catch (error) {
    res.status(500).json({ succes: false, message: "PATCH CATEGORY!" });
  }
});

app.delete("/categories/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.idAd;
    let query: string = "DELETE FROM Category";
    query += ` WHERE id = ?;`;
    const options: string[] = [id];

    db.run(query, options, (err) => {
      if (err) {
        console.error(err);
        return res.sendStatus(500);
      }
      res.sendStatus(204);
    });
  } catch (error) {
    res.status(500).json({ succes: false });
  }
});

app.listen(port, () => {
  console.warn("----------------------------------");
  console.warn(`Example app listening on port ${port}`);
});
