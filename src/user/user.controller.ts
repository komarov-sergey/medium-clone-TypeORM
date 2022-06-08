import * as service from "./user.service";

export async function registerUser(ctx) {
  ctx.body = await service.registerUser(ctx);
}

// export async function login(ctx) {
//   ctx.body = await service.login(ctx);
// }

// export async function getCurrentUser(ctx) {
//   ctx.body = await service.getCurrentUser(ctx);
// }

// export async function updateCurrentUser(ctx) {
//   ctx.body = await service.updateCurrentUser(ctx);
// }
