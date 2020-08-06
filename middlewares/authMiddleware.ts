import { Context, validateJwt } from "../deps.ts";
import User from "../models/User.ts";
import CONFIG from "../config.ts";
import { queryOne } from "../database.ts";

export const authMiddleware = async (ctx: Context, next: Function) => {
  const headers = ctx.request.headers;

  const authHeader = headers.get("Authorization");
  if (!authHeader) {
    ctx.response.status = 401;
    return;
  }
  const jwt = authHeader.split(" ")[1];
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }
  const data: any = await validateJwt(
    { jwt, key: CONFIG.JWT_KEY, algorithm: "HS256" },
  );
  if (data.isValid) {
    console.log(data.payload);
    const user = await queryOne(
      `SELECT * FROM users WHERE username = $1`,
      data.payload.iss
    );
    ctx.state.user = user;
    await next();
  } else {
    ctx.response.status = 401;
  }
};
