import { Router, RouterContext } from "./deps.ts";
import authController from "./controllers/AuthController.ts";
import subredditController from "./controllers/SubredditController.ts";
import { authMiddleware } from "./middlewares/authMiddleware.ts";
import postController from "./controllers/PostController.ts";

const router = new Router();

router.get("/", (ctx: RouterContext) => {
  ctx.response.body = "Hello World";
});

router
  .post("/register", authController.register)
  .post("/login", authController.login)
  .post(
    "/subreddit",
    authMiddleware,
    subredditController.create.bind(subredditController),
  )
  .put(
    "/subreddit/:id",
    authMiddleware,
    subredditController.update.bind(subredditController),
  )
  .delete(
    "/subreddit/:id",
    authMiddleware,
    subredditController.delete.bind(subredditController),
  )
  .get(
    "/subreddit",
    authMiddleware,
    subredditController.index.bind(subredditController),
  )
  .get("/subreddit/:id", subredditController.view.bind(subredditController))
  .post(
    "/follow-subreddit/:id",
    authMiddleware,
    subredditController.followSubreddit.bind(subredditController),
  )
  // Posts
  .get("/post", postController.getAll.bind(postController))
  .post("/post/:id", authMiddleware, postController.create.bind(postController))
  .put("/post/:id", authMiddleware, postController.update.bind(postController))
  .delete(
    "/post/:id",
    authMiddleware,
    postController.delete.bind(postController),
  );

export default router;
