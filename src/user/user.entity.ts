import { Column, PrimaryGeneratedColumn } from "typeorm";

export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  bio: string;

  @Column()
  image: string;

  @Column()
  phone: string;

  @Column()
  token: string;

  @Column()
  organization: string;

  @Column()
  hash: string;

  @Column()
  salt: string;

  @Column()
  createdAt: string;

  @Column()
  updateddAt: string;
}
