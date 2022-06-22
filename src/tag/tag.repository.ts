import { AppDataSource } from '../data-source'
import { DatabaseError } from '../error'
import { Tag } from './tag.entity'

const tagRepository = AppDataSource.getRepository(Tag)

export class TagController {
  public static async getTags() {
    try {
      const tags = await tagRepository.createQueryBuilder('photo').getMany()

      return {
        tags,
      }
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  public static async postTags(name) {
    try {
      const tag = new Tag()
      tag.name = name
      await tagRepository.save(tag)

      return {
        tag,
      }
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }
}
