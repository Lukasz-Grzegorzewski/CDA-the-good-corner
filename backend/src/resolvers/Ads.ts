import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput } from "../entities/Ad";
import { validate } from "class-validator";
import { ObjectId } from "../entities/ObjectId";
import { merge } from "../_helpers/helpers";

@Resolver(Ad)
export class AdsResolver {
  // ADS
  @Query(() => [Ad])
  async ads(): Promise<Ad[]> {
    const ads = await Ad.find({ relations: { category: true, tags: true } });
    return ads;
  }

  // AD BY ID
  @Query(() => Ad)
  async ad_Id(@Arg("id") { id }: ObjectId): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });

    return ad;
  }

  // CREATE AD
  @Mutation(() => Ad)
  async createAd(@Arg("data") data: AdCreateInput): Promise<Ad | null> {
    const newAd = new Ad();
    Object.assign(newAd, data);

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      const adToReturn = await Ad.findOne({
        where: { id: newAd.id },
        relations: { category: true, tags: true },
      });
      console.log(`adToReturn : `, adToReturn);

      return adToReturn;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  // DELETE AD
  @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg("id", () => Int) id: number): Promise<Ad | null> {
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
    @Arg("id", () => Int) id: number,
    @Arg("data") data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id },
      relations: { tags: true },
    });

    if (ad) {
      // merge(ad, data);
      Object.assign(ad, data);
      console.log(`ad : `, ad);

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
