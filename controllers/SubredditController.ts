import dbClient from "../database.ts";
import { RouterContext } from "../deps.ts";

export class SubredditController {
  async create(ctx: RouterContext) {
    const body = await ctx.request.body();
    const data = await body.value;
    const user = ctx.state.user;

    dbClient.query(
      `INSERT INTO subreddits (name, user_id, create_date) 
        VALUES ($1, $2, $3)`,
      data.name,
      user.id,
      new Date(),
    );
    //TODO
  }
}

const subredditController = new SubredditController();

export default subredditController;
