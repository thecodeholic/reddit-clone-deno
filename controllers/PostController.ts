import BaseController from "./BaseController.ts";
import { RouterContext } from "../deps.ts";
import { queryOne, queryArray } from "../database.ts";

class PostController extends BaseController {
  async getAll(ctx: RouterContext) {
    const user = ctx.state.user;

    try {
      let posts = [];
      let select = `
      SELECT 
        p.*,
        s.id as subreddit_id,
        s.name as subreddit_name,
        u.id as user_id, 
        u.username,
        p.upvotes,
        COUNT(c.id) as comments`;
      let from = `
      FROM posts p 
        LEFT JOIN subreddits s on s.id = p.subreddit_id
        LEFT JOIN users u ON u.id = p.user_id
        LEFT JOIN comments c ON c.post_id = p.id`;
      let where = "";
      let groupBy = `GROUP BY p.id, s.id, u.id`;
      let orderBy = `ORDER BY  p.create_date DESC`;

      if (user) {
        from += `LEFT JOIN subreddits_users su ON su.subreddit_id = s.id`;
        where += `WHERE su.user_id = $1`;
        posts = await queryArray(
          `${select} ${from} ${where} ${groupBy} ${orderBy}`,
          user.id,
        );
      } else {
        posts = await queryArray(
          `${select} ${from} ${where} ${groupBy} ${orderBy}`,
        );
      }
      posts = posts.map((p) => ({
        id: +p.id,
        title: p.title,
        type: p.type,
        link: p.link,
        comments: p.comments,
        user: {
          id: p.user_id,
          username: p.username,
        },
        subreddit: {
          id: p.subreddit_id,
          name: p.subreddit_name,
        },
        create_date: p.create_date,
        upvotes: p.upvotes,
      }));
      return this.response(ctx, posts);
    } catch (e) {
      console.log(e);
      return this.internalServerError(ctx);
    }
  }

  async create(ctx: RouterContext) {
    const subredditId = ctx.params.id;
    const body = await ctx.request.body();
    const data = await body.value;
    const user = ctx.state.user;
    try {
      let subreddit = await queryOne(
        `SELECT * FROM subreddits WHERE id = $1`,
        subredditId,
      );
      if (!subreddit) {
        return this.response(ctx, { message: `Subreddit does not exist` }, 404);
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
        type: data.type,
      };

      post = await queryOne(
        `INSERT INTO posts 
            (subreddit_id, title, text, image_video, link, user_id, create_date, upvotes, type)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        ...Object.values(post),
      );
      return this.response(ctx, post, 201);
    } catch (e) {
      console.log(e);
      return this.internalServerError(ctx);
    }
  }

  async update(ctx: RouterContext) {
    const id = ctx.params.id;
    const body = await ctx.request.body();
    const data = await body.value;
    const user = ctx.state.user;

    try {
      let post = await this.findPost(ctx, id, user.id);
      if (!post) {
        return;
      }
      await queryOne(
        `UPDATE posts SET text = $1 WHERE id = $2 RETURNING *`,
        data.text,
        id,
      );
      post.text = data.text;
      console.log(post);
      return this.response(ctx, post, 200);
    } catch (e) {
      console.log(e);
      return this.internalServerError(ctx);
    }
  }

  async delete(ctx: RouterContext) {
    const id = ctx.params.id;
    const user = ctx.state.user;
    let post = await this.findPost(ctx, id, user.id);
    if (!post) {
      return;
    }

    try {
      await queryOne(`DELETE FROM posts WHERE id = $1`, id);
    } catch (e) {
      console.log(e);
      return this.internalServerError(ctx);
    }
  }
}

const postController = new PostController();
export default postController;
