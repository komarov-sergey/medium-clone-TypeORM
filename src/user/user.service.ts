// const User = require("./model");
// mock
const User = {
  create: (body) => {},
  findOne: (body) => {},
  findOneAndUpdate: ({}, {}, {}) => {},
};

export async function registerUser(ctx) {
  let user;
  let body = ctx.request.body.user;
  try {
    user = await User.create({ ...body });
    user.setPassword(body.password);
    user.save();
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in registerUser()"],
      },
    };
  }

  return {
    user: user.toRegisterJSON(),
  };
}

export async function login(ctx) {
  let user;
  let { email, password } = ctx.request.body.user;
  try {
    user = await User.findOne({ email });

    if (!user || !user.validPassword(password)) throw new Error();

    user.token = user.generateJWT();
    user.save();
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in login()"],
      },
    };
  }

  return {
    user: user.toLoginJSON(),
  };
}

export async function getCurrentUser(ctx) {
  let user;
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
    user: ctx.state.user.toCurrentUserJSON(),
  };
}

export async function updateCurrentUser(ctx) {
  let user;
  try {
    user = await User.findOneAndUpdate(
      { _id: ctx.state.user._id.toString() },
      { ...ctx.request.body.user },
      {
        new: true,
        upsert: true,
      }
    );
  } catch (e) {
    ctx.status = 422;

    return {
      errors: {
        body: ["Error in updateCurrentUser()"],
      },
    };
  }

  return {
    user: user.toCurrentUserJSON(),
  };
}
