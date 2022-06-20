import { UserController, UserRepository } from './user.repository'

export async function registerUser(user) {
  const newUser = await UserController.registerUser(user)
  return UserController.toRegisterJSON(newUser)
}

export async function login(email, password) {
  const user = await UserController.loginUser(email, password)
  const newUser = UserController.toLoginJSON(user)
  return { user: newUser }
}

export async function getCurrentUser(user) {
  return UserController.toCurrentUserJSON(user)
}

export async function updateCurrentUser(currentUser, user) {
  const updatedUser = await UserRepository.save({
    ...currentUser,
    ...user,
  })

  return UserController.toCurrentUserJSON(updatedUser)
}
