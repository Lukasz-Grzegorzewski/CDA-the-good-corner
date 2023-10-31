import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Tag } from "../entities/Tag";
import { validate } from "class-validator";
import { ObjectId } from "../entities/ObjectId";

@Resolver(Tag)
export class TagsResolver {
  @Query(() => [Tag])
  async allTags(): Promise<Tag[]> {
    const tags = await Tag.find({
      relations: { ads: true },
    });
    console.log(tags);
    return tags;
  }

  @Query(() => Tag)
  async getTagById(@Arg("id") { id }: ObjectId): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id },
      relations: { ads: true },
    });
    
    return tag;
  }

  @Mutation(() => Tag)
  async createTag(@Arg("name") name: string): Promise<Tag> {
    const newTag = new Tag();
    newTag.name = name;

    const errors = await validate(newTag);
    if (errors.length === 0) {
      await newTag.save();
      return newTag;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }
}
