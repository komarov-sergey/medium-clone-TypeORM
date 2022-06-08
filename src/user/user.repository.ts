import { AppDataSource } from "../data-source";
import crypto from "crypto";

import { User } from "./user.entity";

export const UserRepository = AppDataSource.getRepository(User);

export class UserController {
  private static salt = "salt";

  private static setPassword(user, pass) {
    const hash = crypto
      .pbkdf2Sync(pass, this.salt, 10000, 512, "sha512")
      .toString("hex");

    user.hash = hash;
    user.salt = this.salt;

    return user;
  }

  public static registerUser(userData) {
    const newUser = UserRepository.create({ ...userData });

    this.setPassword(newUser, userData.password);

    return UserRepository.save(newUser);
  }
}
