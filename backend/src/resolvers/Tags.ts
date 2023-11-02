import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagCreateInput, TagUpdateInput } from "../entities/Tag";
import { validate } from "class-validator";
import { ObjectId } from "../entities/ObjectId";

@Resolver(Tag)
export class TagsResolver {
  // TAGS
  @Query(() => [Tag])
  async tags(): Promise<Tag[]> {
    const tags = await Tag.find({
      relations: { ads: true },
    });
    return tags;
  }

  // TAG BY ID
  @Query(() => Tag)
  async tag_Id(@Arg("id") { id }: ObjectId): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id },
      relations: { ads: true },
    });

    return tag;
  }

  // CREATE TAG
  @Mutation(() => Tag)
  async createTag(@Arg("data") data: TagCreateInput): Promise<Tag> {
    const newTag = new Tag();
    Object.assign(newTag, data);

    const errors = await validate(newTag);
    if (errors.length === 0) {
      await newTag.save();
      return newTag;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  // DELETE TAG
  @Mutation(() => Tag, { nullable: true })
  async deleteTag(@Arg("id", () => Int) id: number): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id }
    });

    if (tag) {
      await tag.remove();
      tag.id = id
    }

    return tag
  }

  // UPDATE TAG
  @Mutation(() => Tag)
  async updateTag(@Arg("id", () => Int) id: number, @Arg("data") data: TagUpdateInput): Promise<Tag | null> {
    const tag = await Tag.findOne({
      where: { id }
    });

    if (tag) {
      Object.assign(tag, data);
      await tag.save();
    }

    return tag
  }
}