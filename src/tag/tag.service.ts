import { AppDataSource } from '../data-source'
import { Tag } from './tag.entity'

const tagRepository = AppDataSource.getRepository(Tag)

export async function getTag() {
  const tags = await tagRepository.createQueryBuilder('photo').getMany()

  return {
    tags,
  }
}

export async function postTags(name) {
  const tag = new Tag()
  tag.name = name
  await tagRepository.save(tag)

  return {
    tag,
  }
}
