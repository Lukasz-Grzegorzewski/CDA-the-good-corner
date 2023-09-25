import { Request, Response } from "express";
import { dataSource } from "../datasource";
import { Like, LessThan, MoreThan, Between } from "typeorm";

import { Controller } from ".";
import { Category } from "../entities/Category";
import { Ad } from "../entities/Ad";
import { Tag } from "../entities/Tag";

export class AdsController extends Controller {
  /* Get all ads
   * Filters: -substrings(title, description, owner, location)
   *          -ranges(price, createdAt)
   */
  getAll = async (req: Request, res: Response) => {
    try {
      const { filter, sort, page, limit } = req.query;

      type Filter = { [key: string]: string };

      const options = { relations: { category: true, tags: true } };
      const where = {};
      const order = {};

      //-----FILTER
      if (filter) {
        const filterObj = filter as Filter;
        const alowedParameters: string[] = [
          "title",
          "description",
          "owner",
          "location",
        ];

        //-----STRING FILTER
        for (const prop in filterObj) {
          if (alowedParameters.includes(prop)) {
            Object.assign(where, { [prop]: Like(`%${filterObj[prop]}%`) });            
          }
        }

        //-----RANGES FILTER :
        //price range filter
        if ("price_start" in filterObj && "price_end" in filterObj) {
          Object.assign(where, {
            price: Between(filterObj.price_start, filterObj.price_end),
          });
        } else if ("price_start" in filterObj) {
          Object.assign(where, {
            price: MoreThan(filterObj.price_start),
          });
        } else if ("price_end" in filterObj) {
          Object.assign(where, {
            price: LessThan(filterObj.price_end),
          });
        }

        //date range filter
        if ("date_start" in filterObj && "date_end" in filterObj) {
          Object.assign(where, {
            createdAt: Between(filterObj.date_start, filterObj.date_end),
          });
        } else if ("date_start" in filterObj) {
          Object.assign(where, {
            createdAt: MoreThan(filterObj.date_start),
          });
        } else if ("date_end" in filterObj) {
          Object.assign(where, {
            createdAt: LessThan(filterObj.date_end),
          });
        }
      }

      //-----SORTING
      if (sort) {
        const orderKeyParamsString = Object.entries(sort)[0][0];
        const orderValueParamsString = Object.values(sort)[0] as string;
        const orderKeyParamsArr = orderKeyParamsString
          .replace(/[\[\]\s]/g, "")
          .split(",");
        const orderValueParamsArr = orderValueParamsString
          .replace(/[\[\]\s]/g, "")
          .split(",");

        for (let i = 0; i < orderKeyParamsArr.length; i++) {
          Object.assign(order, {
            [orderKeyParamsArr[i]]: orderValueParamsArr[i],
          });
        }
      }

      //-----PAGINATION
      if (limit && !isNaN(Number(limit))) {
        const limitNumber = Number(limit);
        const pageNumber = Number(page);

        if (pageNumber > 1) {
          const skip = (pageNumber - 1) * limitNumber;
          Object.assign(options, { skip });
        }
        Object.assign(options, { take: limit });
      }

      //FINAL OPTIONS MERGE
      Object.assign(options, { where }, { order });     
      const resultAds = await Ad.find(options);

      if (resultAds.length > 0) res.status(200).send(resultAds);
      else res.sendStatus(404);
    } catch (error) {
      console.error(error);
      res.status(500).json({ succes: false, message: "GET_ALL ADS !" });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const ad = await Ad.findOne(
        {relations: { category: true, tags: true },
        where: { id },
      });

      if (ad) return res.status(200).send(ad);
      else res.sendStatus(404);
    } catch (error) {
      console.error(error);
      res.status(500).json({ succes: false, message: "GET_BY_ID AD !" });
    }
  };

  getAdsByCategoryId = async (req: Request, res: Response) => {
    try {
      const categoryId = Number(req.params.id);
      const ads = await dataSource
        .getRepository(Ad)
        .createQueryBuilder("ad")
        .leftJoin(Category, "category", "ad.categoryId = category.id")
        // .leftJoin(Tag, "tag", "ad.tagId = tag.id")
        .select(["category.name AS category", "ad.*"])
        .where("ad.categoryId = :categoryId", { categoryId })
        .getRawMany();

      if (ads.length > 0) return res.status(200).send(ads);
      else res.sendStatus(404);
    } catch (error) {
      console.error(error);
      res.status(500).json({ succes: false, message: "GET_ALL CATEGORIES !" });
    }
  };

  createOne = async (req: Request, res: Response) => {
    try {
      const inputs = req.body;
      const ad = await new Ad();
      if (ad) {
        Object.assign(ad, inputs);
      }
      const { id } = await ad.save();
      if (id) return res.status(200).json({ succes: true, id });
      else res.status(422).json({ succes: false });
    } catch (error) {
      console.error(error);
      res.status(500).json({ succes: false, message: "POST AD !" });
    }
  };

  patchOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const inputs = req.body;

      const ad = await Ad.findOneBy({ id });

      if (ad) {
        Object.assign(ad, inputs, { id: ad.id });
        const status = await ad.save();

        if (status) res.sendStatus(204);
        else res.sendStatus(500);
      } else res.sendStatus(404);

      // ALTERNATIVE (SQL aproach)
      // const result: UpdateResult = await Ad.update({ id }, { ...inputs });
      // if (result.affected === 1) return res.status(200).json({ succes: true });
      // else res.status(304).json({ succes: false });
    } catch (error) {
      res.status(500).json({ succes: false, message: "PATCH AD !" });
    }
  };

  updateOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const inputs = req.body;

      const [ad] = await Ad.findBy({ id });

      if (ad) {
        const adId = ad.id;
        for (const key in ad) {
          const temp = key as keyof Ad;
          if (temp != "id") delete ad[temp];
        }

        Object.assign(ad, inputs, { id: adId });
        const status = await ad.save();

        if (status) res.sendStatus(204);
        else res.sendStatus(500);
      } else res.sendStatus(404);
    } catch (error) {
      res.status(500).json({ succes: false, message: "PUT AD !" });
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);

      const ad = await Ad.findOne({ where: { id } });

      if (ad) {
        const removedAd = await ad.remove();
        if (removedAd) res.sendStatus(204);
        else res.sendStatus(500);
      } else return res.sendStatus(404);
    } catch (error) {
      console.error(error);
      res.status(500).json({ succes: false, message: "DELETE AD!" });
    }
  };
}
