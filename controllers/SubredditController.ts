import dbClient, { queryOne } from "../database.ts";
import { RouterContext } from "../deps.ts";
import { QueryResult } from "../deps.ts";

export class SubredditController {
  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const data = await body.value;
    const user = ctx.state.user;

    try {
      const subreddit = await queryOne(
        `INSERT INTO subreddits (name, user_id, create_date) 
          VALUES ($1, $2, $3) RETURNING *`,
          data.name,
          user.id,
          new Date()
      );
      const subredditUser: QueryResult = await queryOne(
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
}

const subredditController = new SubredditController();

export default subredditController;
