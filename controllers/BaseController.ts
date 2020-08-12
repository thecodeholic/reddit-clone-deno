import {RouterContext} from '../deps.ts';
import router from '../router.ts';
import { queryOne } from '../database.ts';

export default class BaseController {

  response(ctx: RouterContext, body: any, status = 200) {
    ctx.response.status = status;
    ctx.response.body = body;
  }

  async findPost(ctx: RouterContext, id: any, userId = null) {
    let post = await queryOne(`SELECT * FROM posts WHERE id = $1`, id);
    if (!post) {
      return this.response(ctx, {message: `Post does not exist`}, 404);
    }
    if (userId && post.user_id !== userId) {
      return this.response(ctx, {message: `You don't have permission to update this post`}, 403);
    }

    return post;
  }

  async internalServerError(ctx: RouterContext) {
    return this.response(ctx, {message: "Internal server error"}, 500);
  }
}