import * as Koa from 'koa'

export abstract class BaseController {
  /**
   * This is the implementation that we will leave to the
   * subclasses to figure out.
   */

  protected abstract executeImpl(ctx: Koa.Context): Promise<void | any>

  /**
   * This is what we will call on the route handler.
   * We also make sure to catch any uncaught errors in the
   * implementation.
   */

  public async execute(ctx: Koa.Context): Promise<void> {
    try {
      await this.executeImpl(ctx)
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`)
      console.log(err)
      this.fail(ctx, 'An unexpected error occurred')
    }
  }

  public clientError(ctx: Koa.Context, message?: string) {
    return ctx.throw(400, message ? message : 'Unauthorized')
  }

  public unauthorized(ctx: Koa.Context, message?: string) {
    return ctx.throw(401, message ? message : 'Unauthorized')
  }

  public fail(ctx: Koa.Context, error: Error | string) {
    console.log(error)
    return ctx.throw(401, error.toString())
  }

  public ok<T>(ctx: Koa.Context, dto?: T) {
    if (!!dto) {
      ctx.status = 200
      ctx.body = dto
    } else {
      ctx.status = 200
    }
  }

  // public created(res: Koa.Response) {
  //   return res.sendStatus(201)
  // }
}
