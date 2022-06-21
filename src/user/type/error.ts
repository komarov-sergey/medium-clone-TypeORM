import { Either } from '../../utils/either'

type DomainError = {
  message: string
}

type UserAlreadyExists = DomainError
type EmailInvalid = DomainError
type PasswordDoesntMeetCriteria = DomainError
type UsernameTaken = DomainError

type CreateUserSuccess = {
  id: string
}

type CreateUserResult = Either<
  // Success
  CreateUserSuccess,
  // Failures
  UserAlreadyExists | EmailInvalid | PasswordDoesntMeetCriteria | UsernameTaken
>
