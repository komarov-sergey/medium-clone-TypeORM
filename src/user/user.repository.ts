import { AppDataSource } from '../data-source'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { User } from './user.entity'
import { DatabaseError } from '../error'

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
    try {
      let newUser = UserRepository.create({ ...userData })
      this.setPassword(newUser, userData.password)
      this.generateJWT(newUser)
      await UserRepository.save(newUser)

      return this.toRegisterJSON(newUser)
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  public static async loginUser(email: string, password: string) {
    try {
      let user = await UserRepository.findOneBy({ email })

      if (!user || !this.validPassword(password, user.hash))
        return Promise.reject('Not valid email or password')

      this.generateJWT(user)
      await UserRepository.save(user)

      return this.toLoginJSON(user)
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  public static async getCurrentUser(user) {
    try {
      return this.toCurrentUserJSON(user)
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  public static async updateCurrentUser(currentUser, user) {
    try {
      const updatedUser = await UserRepository.save({
        ...currentUser,
        ...user,
      })

      return this.toCurrentUserJSON(updatedUser)
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  static toRegisterJSON(newUser) {
    return {
      user: {
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        token: newUser.token,
        createdAt: newUser.createdAt,
      },
    }
  }

  static toLoginJSON(user) {
    return {
      user: {
        username: user.username,
        email: user.email,
        token: user.token,
        bio: user.bio,
        image: user.image,
      },
    }
  }

  public static toCurrentUserJSON(user) {
    return {
      user: {
        username: user.username,
        email: user.email,
        token: user.token,
        bio: user.bio,
        image: user.image,
      },
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
