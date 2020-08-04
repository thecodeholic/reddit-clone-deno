import { RouterContext } from "../deps.ts";
import dbClient from "../database.ts";

class AuthController {
  async register(ctx: RouterContext) {
    const body = await ctx.request.body();
    const data = await body.value;
    console.log(data);

    dbClient.query(
      "INSERT INTO users (username, email, karma, password, create_date) VALUES ($1, $2, $3, $4, $5)",
      data.username,
      data.email,
      0,
      data.password,
      new Date(),
    );

    ctx.response.body = "Register";
  }
  async login(ctx: RouterContext) {
    ctx.response.body = "Login";
  }
}

const authController = new AuthController();

export default authController;
