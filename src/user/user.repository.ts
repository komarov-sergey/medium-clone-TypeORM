import { AppDataSource } from '../data-source'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { User } from './user.entity'

export const UserRepository = AppDataSource.getRepository(User)

export class UserController {
  private static salt = 'salt'
  private static secret = 'secret'

  private static setPassword(user, pass) {
    const hash = crypto
      .pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512')
      .toString('hex')

    user.hash = hash
    user.salt = this.salt

    return user
  }

  private static generateJWT(user) {
    const today = new Date()
    const exp = new Date(today)

    // 60 days
    exp.setDate(today.getDate() + 60)

    user.token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        exp: parseInt((exp.getTime() / 1000).toString()),
      },
      this.secret
    )

    return user
  }

  public static validPassword(pass: string, dbHash: string): boolean {
    const hash = crypto
      .pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512')
      .toString('hex')

    return hash === dbHash
  }

  public static async registerUser(userData) {
    let newUser = await UserRepository.create({ ...userData })

    this.setPassword(newUser, userData.password)
    this.generateJWT(newUser)

    return UserRepository.save(newUser)
  }

  public static toRegisterJSON(user) {
    return {
      username: user.username,
      email: user.email,
      phone: user.phone,
      token: user.token,
      createdAt: user.createdAt,
    }
  }

  public static toLoginJSON(user) {
    return {
      username: user.username,
      email: user.email,
      token: user.token,
      bio: user.bio,
      image: user.image,
    }
  }

  public static toCurrentUserJSON(user) {
    return {
      username: user.username,
      email: user.email,
      token: user.token,
      bio: user.bio,
      image: user.image,
    }
  }

  public static toProfileJSON(user, id) {
    return {
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: user ? this.isFollowing(user, id) : false,
    }
  }

  public static async loginUser(email: string, password: string) {
    let user = await UserRepository.findOneBy({ email })

    if (!user || !this.validPassword(password, user.hash))
      throw new Error('Not valid email or password')
    this.generateJWT(user)

    return UserRepository.save(user)
  }

  public static async follow(user, id) {
    if (user.following.indexOf(id) === -1)
      user.following = user.following.concat(id)

    return UserRepository.save(user)
  }

  public static isFollowing(user, id) {
    return user.following.some(
      followId => followId.toString() === id.toString()
    )
  }
}
