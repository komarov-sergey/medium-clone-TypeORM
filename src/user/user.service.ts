import { UserController, UserRepository } from "./user.repository";
import { User } from "./user.entity";

export async function registerUser(ctx) {
  let newUser;
  let body = ctx.request.body.user;
  try {
    newUser = await UserController.registerUser(body);
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in registerUser()"],
      },
    };
  }

  return {
    user: UserController.toRegisterJSON(newUser),
  };
}

export async function login(ctx) {
  let user;
  let { email, password } = ctx.request.body.user;
  try {
    user = await UserController.loginUser(email, password);
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in login()"],
      },
    };
  }

  return {
    user: UserController.toLoginJSON(user),
  };
}

export async function getCurrentUser(ctx) {
  try {
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in getCurrentUser()"],
      },
    };
  }

  return {
    user: UserController.toCurrentUserJSON(ctx.state.user),
  };
}

export async function updateCurrentUser(ctx) {
  let user;
  try {
    user = await UserRepository.save({
      ...ctx.state.user,
      ...ctx.request.body.user,
    });
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in updateCurrentUser()"],
      },
    };
  }

  return {
    user: UserController.toCurrentUserJSON(user),
  };
}
