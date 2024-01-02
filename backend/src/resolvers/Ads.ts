import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput, AdsWhere } from "../entities/Ad";
import { validate } from "class-validator";
import { merge } from "../_helpers/helpers";
import { ILike, In } from "typeorm";

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

@Resolver(Ad)
export class AdsResolver {
  // ADS ALL (options: page, limit, query)
  @Query(() => [Ad])
  async ads(
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
      relations: { category: true, tags: true },
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
      relations: { category: true, tags: true },
    });

    return ad;
  }

  // ADS BY CATEGORY ID
  @Query(() => [Ad])
  async ads_By_Category_Id(@Arg("id", () => ID) id: number): Promise<Ad[]> {
    const ads = await Ad.find({
      where: { category: { id } },
      relations: { category: true, tags: true },
    });
    return ads;
  }

  // CREATE AD
  @Mutation(() => Ad)
  async createAd(@Arg("data") data: AdCreateInput): Promise<Ad | null> {
    const newAd = new Ad();

    //add createdAt property
    const date = new Date();
    Object.assign(newAd, data);

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      const adToReturn = await Ad.findOne({
        where: { id: newAd.id },
        relations: { category: true, tags: true },
      });
      return adToReturn;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  // DELETE AD
  @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });

    if (ad) {
      await ad.remove();
      ad.id = id;
    }

    return ad;
  }

  // UPDATE AD
  @Mutation(() => Ad)
  async updateAd(
    @Arg("id", () => ID) id: number,
    @Arg("data") data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { tags: true },
    });

    if (ad) {
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
          },
        });
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    }
    return ad;
  }
}
