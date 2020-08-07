import BaseController from "./BaseController.ts";
import {RouterContext} from '../deps.ts';
import { queryOne } from "../database.ts";

class PostController extends BaseController {
  async create(ctx: RouterContext) {
    const subredditId = ctx.params.id;
    const body = await ctx.request.body();
    const data = await body.value;
    const user = ctx.state.user;
    try {
      let subreddit = await queryOne(`SELECT * FROM subreddits WHERE id = $1`, subredditId);
      if (!subreddit) {
        return this.response(ctx, {message: `Subreddit does not exist`}, 404);
      }

      let post = {
        subreddit_id: subredditId,
        title: data.title,
        text: data.text,
        image_video: null,
        link: data.link,
        user_id: user.id,
        create_date: new Date(),
        upvotes: 1,
        type: data.type
      };
      
      post = await queryOne(`INSERT INTO posts 
            (subreddit_id, title, text, image_video, link, user_id, create_date, upvotes, type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            ...Object.values(post)
      )
      return this.response(ctx, post, 201);
    } catch(e) {
      console.log(e);
      return this.response(ctx, {message: 'Internal Server error'}, 500);
    }


  }
}

const postController = new PostController();
export default postController;