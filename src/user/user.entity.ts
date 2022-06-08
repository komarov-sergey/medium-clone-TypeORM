import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from "typeorm";

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
}
