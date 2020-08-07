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
  .post("/subreddit", authMiddleware, subredditController.create.bind(subredditController))
  .put("/subreddit/:id", authMiddleware, subredditController.update.bind(subredditController))
  .delete("/subreddit/:id", authMiddleware, subredditController.delete.bind(subredditController))
  .get("/subreddit", authMiddleware, subredditController.index.bind(subredditController))
  .get("/subreddit/:id", authMiddleware, subredditController.view.bind(subredditController));

export default router;
