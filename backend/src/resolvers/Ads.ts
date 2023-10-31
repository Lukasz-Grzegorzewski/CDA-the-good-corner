import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdInput } from "../entities/Ad";
import { validate } from "class-validator";
import { ObjectId } from "../entities/ObjectId";

@Resolver(Ad)
export class AdsResolver {
  @Query(() => [Ad])
  async allAds(): Promise<Ad[]> {
    const ads = await Ad.find({ relations: { category: true, tags: true } });
    return ads;
  }

  @Query(() => Ad)
  async getAdById(@Arg("id") { id }: ObjectId): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });

    return ad;
  }

  @Mutation(() => Ad)
  async createAd(@Arg("data", () => AdInput) data: AdInput): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data);

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }
}
