import { AppDataSource } from "../data-source";
import { Tag } from "./tag.entity";

const tagRepository = AppDataSource.getRepository(Tag);

export async function getTag(ctx) {
  let tags;
  try {
    tags = await tagRepository.createQueryBuilder("photo").getMany();
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in getTag()"],
      },
    };
  }

  return {
    tags,
  };
}

export async function postTags({ name }) {
  const tag = new Tag();
  tag.name = name;
  await tagRepository.save(tag);

  return {
    tag,
  };
}
