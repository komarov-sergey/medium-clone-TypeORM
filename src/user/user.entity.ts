import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

import { Article } from '../article/article.entity'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  bio: string

  @Column({
    nullable: true,
    default: 'https://static.productionready.io/images/smiley-cyrus.jpg',
  })
  image: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  token: string

  @Column({ nullable: true })
  organization: string

  @Column({ nullable: true })
  hash: string

  @Column({ nullable: true })
  salt: string

  @CreateDateColumn()
  createdAt: string

  @UpdateDateColumn()
  updateddAt: string

  @VersionColumn({ nullable: true })
  version: number

  @OneToMany(() => Article, article => article.author)
  articles: Article[]

  @OneToMany(() => User, user => user.id)
  following: User[]

  // TODO many To many?
  @OneToMany(() => Article, article => article.author)
  favorites: Article[]
}
