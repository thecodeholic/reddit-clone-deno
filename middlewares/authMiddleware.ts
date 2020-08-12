import { Context, validateJwt } from "../deps.ts";

export const authMiddleware = async (ctx: Context, next: Function) => {
  const user = ctx.state.user;
  if (user) {
    await next();
  } else {
    ctx.response.status = 401;
  }
};
