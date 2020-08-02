import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";

const router = new Router();

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello World";
});

router
  .post("/register", authController.register)
  .post("/login", authController.login);

export default router;
