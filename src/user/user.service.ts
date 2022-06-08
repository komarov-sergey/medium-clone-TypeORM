import { AppDataSource } from "../data-source";
import { User } from "./user.entity";
import { UserController } from "./user.repository";

const userRepository = AppDataSource.getRepository(User);

export async function registerUser(ctx) {
  let newUser;
  let body = ctx.request.body.user;
  try {
    // newUser = userRepository.create({ ...body });
    // user.setPassword(body.password);
    // await userRepository.save(newUser);

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
    newUser,
  };
}

// export async function login(ctx) {
//   let user;
//   let { email, password } = ctx.request.body.user;
//   try {
//     user = await User.findOne({ email });

//     if (!user || !user.validPassword(password)) throw new Error();

//     user.token = user.generateJWT();
//     user.save();
//   } catch (e) {
//     ctx.status = 422;

//     return {
//       errors: {
//         body: ["Error in login()"],
//       },
//     };
//   }

//   return {
//     user: user.toLoginJSON(),
//   };
// }

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
