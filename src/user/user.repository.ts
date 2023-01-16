import { AppDataSource } from '../data-source'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { User } from './user.entity'
import { DatabaseError } from '../error'
import { tryCatch, tryCatchAsync } from '../utils/either'
import Task from 'data.task'

export const UserRepository = AppDataSource.getRepository(User)

export class UserController {
  private salt = 'salt'
  private secret = 'secret'
  private repo

  public constructor(repo) {
    this.repo = repo
  }

  private setPassword(user, pass) {
    const hash = crypto
      .pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512')
      .toString('hex')

    user.hash = hash
    user.salt = this.salt

    return user
  }

  private generateJWT(user) {
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

  public validPassword(pass: string, dbHash: string): boolean {
    const hash = crypto
      .pbkdf2Sync(pass, this.salt, 10000, 512, 'sha512')
      .toString('hex')

    return hash === dbHash
  }

  public async registerUser(userData) {
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

  public async loginUser(email: string, password: string) {
    try {
      let user = await this.repo.findOneBy({ email })

      if (!user || !this.validPassword(password, user.hash))
        return Promise.reject('Not valid email or password')

      this.generateJWT(user)
      await this.repo.save(user)

      return this.toLoginJSON(user)
    } catch (e) {
      return Promise.reject(new DatabaseError(e).toString())
    }
  }

  public async getCurrentUser(user) {
    return tryCatch(() => this.toCurrentUserJSON(user)).fold(
      e => Promise.reject(new DatabaseError(e).toString()),
      d => d
    )
  }

  public async updateCurrentUser(currentUser, user) {
    // return (
    //   await tryCatchAsync(() => {
    //     throw new Error('Test')
    //     return UserRepository.save({ ...currentUser, ...user })
    //   })
    // ).fold(
    //   e => e.toString(),
    //   updatedUser => this.toCurrentUserJSON(updatedUser)
    // )
    const updateUser = (currentUser, user) =>
      Task((rej, res) => {
        UserRepository.save({ ...currentUser, ...user })
          .then(data => res(data))
          .catch(err => rej(err))
      })

    return updateUser(currentUser, user)
      .chain(userR => this.toCurrentUserJSON(userR))
      .fork(
        e => console.log(e),
        user => user
      )
  }

  public toRegisterJSON(newUser) {
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

  public toLoginJSON(user) {
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

  public toCurrentUserJSON(user) {
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

  public toProfileJSON(user, id) {
    return {
      username: user.username,
      bio: user.bio,
      image: user.image,
      following: user ? this.isFollowing(user, id) : false,
    }
  }

  public async follow(user, id) {
    if (user.following.indexOf(id) === -1)
      user.following = user.following.concat(id)

    return UserRepository.save(user)
  }

  public isFollowing(user, id) {
    return user.following.some(
      followId => followId.toString() === id.toString()
    )
  }
}
