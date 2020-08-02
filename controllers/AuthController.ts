import { RouterContext } from "../deps.ts";

class AuthController {
  async register(ctx: RouterContext) {
    const body = await ctx.request.body();
    const data = await body.value;
    console.log(data);

    ctx.response.body = "Register";
  }
  async login(ctx: RouterContext) {
    ctx.response.body = "Login";
  }
}

const authController = new AuthController();

export default authController;
