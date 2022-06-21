import { UserController, UserRepository } from '../user/user.repository'

export async function getProfile(username) {
  const user = await UserRepository.findOneBy({ username })

  if (!user) throw new Error('User not found')
}

export async function followUser() {}

export async function unfollowUser() {}
