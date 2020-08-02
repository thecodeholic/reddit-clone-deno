import {Router, RouterContext} from './deps.ts';
import authController from './controllers/AuthController.ts';

const router = new Router();

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello World";
});

router
  .get("/register", authController.register)
  .get("/login", authController.login)
;


export default router;