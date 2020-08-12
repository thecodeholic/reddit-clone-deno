import { Context, validateJwt } from "../deps.ts";
import CONFIG from "../config.ts";
import { queryOne } from "../database.ts";

export const userMiddleware = async (ctx: Context, next: Function) => {
  const headers = ctx.request.headers;

  const authHeader = headers.get("Authorization");
  if (authHeader) {
    const jwt = authHeader.split(" ")[1];
    if (jwt) {
      const data: any = await validateJwt(
        { jwt, key: CONFIG.JWT_KEY, algorithm: "HS256" },
      );
      if (data.isValid) {
        const user = await queryOne(
          `SELECT * FROM users WHERE username = $1`,
          data.payload.iss
        );
        ctx.state.user = user;
      }
    }
  }
  
  await next();
};
