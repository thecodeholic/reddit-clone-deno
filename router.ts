import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import subredditController from "./controllers/SubredditController.ts";
import { authMiddleware } from "./middlewares/authMiddleware.ts";

const router = new Router();

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello World";
});

router
  .post("/register", authController.register)
  .post("/login", authController.login)
  .post("/subreddit", authMiddleware, subredditController.create)
  .put("/subreddit/:id", authMiddleware, subredditController.update)
  .delete("/subreddit/:id", authMiddleware, subredditController.delete)
  .get("/subreddit", authMiddleware, subredditController.index)
  .get("/subreddit/:id", authMiddleware, subredditController.view);

export default router;
