export default async function (ctx, next) {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    const code = err.code || "INTERNAL_SERVER_ERROR";
    const description = err.message || "";
    const stack = ctx.status === 500 ? err.stack : "";
    ctx.body = { code, description, stack };
  }
}
