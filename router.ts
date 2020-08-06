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
  .post("/subreddit", authMiddleware, subredditController.create);
// .put("/subreddit/:id", subredditController.update)
// .delete("/subreddit/:id", subredditController.delete)
// .get("/subreddit", subredditController.index)
// .get("/subreddit/:id", subredditController.view);

export default router;
