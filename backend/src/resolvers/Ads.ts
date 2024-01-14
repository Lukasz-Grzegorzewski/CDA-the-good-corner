import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput, AdsWhere } from "../entities/Ad";
import { validate } from "class-validator";
import { merge } from "../_helpers/helpers";
import { ILike, In } from "typeorm";
import { UserContext } from "../types";

function createWhereObject(whereIn?: AdsWhere): {
  [key: string]: unknown;
} {
  const where: any = {};

  if (whereIn?.categoryId) {
    where.category = { id: In(whereIn.categoryId) };
  }

  if (whereIn?.searchTitle) {
    where.title = ILike(`%${whereIn.searchTitle}%`);
  }

  return where;
}

// USEFULL FOR MIDDLEWARES
// import { test } from "../middlewares/test";
// @UseMiddleware(test)

@Resolver(Ad)
export class AdsResolver {
  // ADS ALL (options: page, limit, where{categoryId: {id: "1"}, searchTitle: "test"})
  // @Authorized()
  @Query(() => [Ad])
  async ads(
    @Ctx() context: UserContext,
    @Arg("page") page: string,
    @Arg("limit")
    limit: string,
    @Arg("where") where: AdsWhere
  ): Promise<Ad[]> {
    const take = limit ? parseInt(limit) : 20;
    const skip = page ? (parseInt(page) - 1) * take : 0;
    const queryWhere = createWhereObject(where);

    const ads = await Ad.find({
      where: queryWhere,
      relations: { category: true, tags: true, createdBy: true },
      skip,
      take,
    });
    return ads;
  }

  @Query(() => Int)
  async allAdsCount(
    @Arg("where", { nullable: true }) where?: AdsWhere
  ): Promise<number> {
    const queryWhere = createWhereObject(where);
    const count = await Ad.count({
      where: queryWhere,
    });
    return count;
  }

  // AD BY ID

  @Query(() => Ad)
  async ad_Id(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, createdBy: true },
    });

    return ad;
  }

  // CREATE AD
  @Authorized("SUPERADMIN", "ADMIN", "SUBSCRIBED")
  @Mutation(() => Ad)
  async createAd(
    @Ctx() context: UserContext,
    @Arg("data") data: AdCreateInput
  ): Promise<Ad | null> {
    const newAd = new Ad();

    const date = new Date();

    Object.assign(newAd, data, { createdBy: context.user, createdAt: date });

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      const adToReturn = await Ad.findOne({
        where: { id: newAd.id },
        relations: { category: true, tags: true, createdBy: true },
      });
      return adToReturn;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  // DELETE AD
  @Authorized("SUPERADMIN", "ADMIN", "SUBSCRIBED")
  @Mutation(() => Ad)
  async deleteAd(
    @Ctx() context: UserContext,
    @Arg("id", () => ID) id: number
  ): Promise<Ad> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, createdBy: true },
    });

    if (
      ad &&
      (ad.createdBy.id === context.user?.id ||
        context.user?.role === "SUPERADMIN" ||
        context.user?.role === "ADMIN")
    ) {
      await ad.remove();
      ad.id = id;
      return ad;
    } else {
      throw new Error(`Ad not found or you are not authorized to delete it`);
    }
  }

  // UPDATE AD
  @Authorized("SUPERADMIN", "ADMIN", "SUBSCRIBED")
  @Mutation(() => Ad)
  async updateAd(
    @Ctx() context: any,
    @Arg("id", () => ID) id: number,
    @Arg("data") data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true, createdBy: true },
    });

    if (
      ad &&
      (ad.createdBy.id === context.user.id ||
        context.user.role === "SUPERADMIN" ||
        context.user.role === "ADMIN")
    ) {
      merge(ad, data);
      Object.assign(ad, data);

      const errors = await validate(ad);
      if (errors.length === 0) {
        await Ad.save(ad);
        return await Ad.findOne({
          where: { id: id },
          relations: {
            category: true,
            tags: true,
            createdBy: true,
          },
        });
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      throw new Error(`Ad not found or you are not authorized to update it`);
    }
  }
}
