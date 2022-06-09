import { UserController } from "./user.repository";

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

// export async function getCurrentUser(ctx) {
//   let user;
//   try {
//   } catch (e) {
//     ctx.status = 422;

//     return {
//       errors: {
//         body: ["Error in getCurrentUser()"],
//       },
//     };
//   }

//   return {
//     user: ctx.state.user.toCurrentUserJSON(),
//   };
// }

// export async function updateCurrentUser(ctx) {
//   let user;
//   try {
//     user = await User.findOneAndUpdate(
//       { _id: ctx.state.user._id.toString() },
//       { ...ctx.request.body.user },
//       {
//         new: true,
//         upsert: true,
//       }
//     );
//   } catch (e) {
//     ctx.status = 422;

//     return {
//       errors: {
//         body: ["Error in updateCurrentUser()"],
//       },
//     };
//   }

//   return {
//     user: user.toCurrentUserJSON(),
//   };
// }
