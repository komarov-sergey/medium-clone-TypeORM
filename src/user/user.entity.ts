import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

import { Article } from "../article/article.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  image: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  organization: string;

  @Column({ nullable: true })
  hash: string;

  @Column({ nullable: true })
  salt: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateddAt: string;

  @VersionColumn({ nullable: true })
  version: number;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
