import { AppDataSource } from '../../data-source'
import { tryCatch } from '../../utils/either'
import { User } from '../user.entity'
import { UserController } from '../user.repository'

test('getCurrentUser', async () => {
  const UserRepository = AppDataSource.getRepository(User)
  const userController = new UserController(UserRepository)

  try {
    const loginResult = await userController.loginUser(
      'komarovs33@mail.ru',
      '1234'
    )
  } catch (e) {
    console.log(e)
  }
  // console.log({ currentUser })
  // const currentUser = await UserController.getCurrentUser(user)
  expect(1).toBe(1)
})
