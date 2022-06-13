import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
  ManyToOne,
} from "typeorm";

import { User } from "../user/user.entity";

@Entity()
export class Article {
  //TODO extract system columns to file
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updateddAt: string;

  @VersionColumn({ nullable: true })
  version: number;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  body: string;

  @Column("simple-array")
  tagList: string[];

  @ManyToOne(() => User, (user) => user.articles, { eager: true })
  author: User;
}
