import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Tag } from './tag/tag.entity'
import { User } from './user/user.entity'
import { Article } from './article/article.entity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'test',
  synchronize: true,
  logging: false,
  // entities: [Tag, User, Article],
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  migrations: [],
  subscribers: [],
})
