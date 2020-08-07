import dbClient, { queryOne, queryArray } from "../database.ts";
import { RouterContext } from "../deps.ts";
import { QueryResult } from "../deps.ts";
import BaseController  from './BaseController.ts';

export class SubredditController extends BaseController {

  async index(ctx: RouterContext) {
    const user = ctx.state.user;

    const subreddits = await queryArray(`
      SELECT s.* FROM subreddits s 
      LEFT JOIN subreddits_users su ON s.id = su.subreddit_id
      WHERE su.user_id = $1
    `, user.id);

    ctx.response.body = subreddits;
  }

  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const data = await body.value;
    const user = ctx.state.user;

    if (!data.name || !data.title || !data.description) {
      return this.response(ctx, {message: 'Please provide name, title and description'}, 422);
    }

    try {
      let subreddit = await queryOne(`SELECT * FROM subreddits WHERE name = $1`, data.name);
      if (subreddit) {
        ctx.response.status = 422;
        ctx.response.body = {message: `Subreddit "${data.name}" already exists`};
        return;
      }
      subreddit = await queryOne(
        `INSERT INTO subreddits (name, title, description, user_id, create_date) 
          VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          data.name,
          data.title,
          data.description,
          user.id,
          new Date()
      );
      await queryOne(
        `INSERT INTO subreddits_users (user_id, subreddit_id, create_date) 
          VALUES ($1, $2, $3) RETURNING *`,
          user.id,
          subreddit.id,
          new Date()
      );
      
      console.log(subreddit);
      ctx.response.status = 201;
      ctx.response.body = subreddit;
      return;
    } catch(e) {
      console.log(e);
      ctx.response.status =500;
      ctx.response.body = {message: "Internal server error"}
    }
  }

  async update(ctx: RouterContext) {
    const id = ctx.params.id;
    const body = await ctx.request.body()
    const data = await body.value;
    const user = ctx.state.user;
    try {
      let subreddit = await queryOne(`SELECT * FROM subreddits WHERE id = $1`, id);
      if (!subreddit) {
        ctx.response.status = 404;
        ctx.response.body = {message: `Subreddit does not exist`}
        return;
      }
      if (subreddit.user_id !== user.id) {
        ctx.response.status = 403;
        ctx.response.body = {message: `You don't have permission to access this resource`}
        return;
      }
      await queryOne("UPDATE subreddits SET title = $1, description = $2 WHERE id = $3", 
          data.title, data.description, id);
      subreddit.title = data.title;
      subreddit.description = data.description;
      ctx.response.body = subreddit;
    } catch(e) {
      console.log(e);
      ctx.response.status = 500;
      ctx.response.body = {message: "Internal server error"}
    }
  }

  async delete(ctx: RouterContext) {
    const id = ctx.params.id;
    const user = ctx.state.user;
    let subreddit = await queryOne(`SELECT * FROM subreddits WHERE id = $1`, id);
    if (!subreddit) {
      ctx.response.status = 404;
      ctx.response.body = {message: `Subreddit does not exist`}
      return;
    }
    if (subreddit.user_id !== user.id) {
      ctx.response.status = 403;
      ctx.response.body = {message: `You don't have permission to access this resource`}
      return;
    }

    try {
      await queryOne(`DELETE FROM subreddits WHERE id = $1`, id)
      ctx.response.status = 204;
    } catch(e) {
      console.log(e);
      ctx.response.status =500;
      ctx.response.body = {message: "Internal server error"}
    }

  }

  async view(ctx: RouterContext) {

  }
}

const subredditController = new SubredditController();

export default subredditController;