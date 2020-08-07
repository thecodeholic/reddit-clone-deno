import {
  RouterContext,
  QueryResult,
  hashSync,
  compareSync,
  makeJwt,
  Jose,
  setExpiration,
  Payload,
} from "../deps.ts";
import dbClient, { queryOne } from "../database.ts";
import User from "../models/User.ts";
import CONFIG from "../config.ts";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

class AuthController {
  async register(ctx: RouterContext) {
    const body = await ctx.request.body();
    const data = await body.value;

    let user = new User(
      undefined,
      data.username,
      data.email,
      0,
      new Date(),
      hashSync(data.password),
    );

    // Check if username or email already exists
    const { rows }: QueryResult = await dbClient.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      user.username,
      user.email,
    );
    if (rows.length > 0) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Username or Email is already used",
      };
      return;
    }

    // Register user in database
    const result: QueryResult = await dbClient.query(
      `INSERT INTO users (username, email, karma, password, create_date)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      user.username,
      user.email,
      user.karma,
      user.password,
      user.create_date,
    );
    if (result.rows.length > 0) {
      user.id = +result.rows[0][0];
      delete user.password;
      ctx.response.body = user;
    } else {
      ctx.response.status = 500;
      ctx.response.body = "Internal server error";
    }
  }

  async login(ctx: RouterContext) {
    const body = await ctx.request.body();
    const data = await body.value;

    // Select user by username
    const user = await queryOne(
      "SELECT * FROM users WHERE username = $1",
      data.username,
    );

    if (!user) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "User does not exist with this username",
      };
      return;
    }
    if (!compareSync(data.password, user.password)) {
      ctx.response.status = 422;
      ctx.response.body = {
        message: "Incorrect password",
      };
      return;
    }
    console.log("Create JWT and return");

    const payload: Payload = {
      iss: user.username,
      exp: setExpiration(60 * 60),
    };
    delete user.password;
    ctx.response.body = {
      ...user,
      jwt: await makeJwt({ header, payload: payload, key: CONFIG.JWT_KEY }),
    };
    // const rows: any[] = [];
    // result.rows.forEach((row) => {
    //   const obj: any = {};
    //   row.forEach((value: any, ind: number) => {
    //     obj[result.rowDescription.columns[ind].name] = value;
    //   });
    //   rows.push(obj);
    // });
  }
}

const authController = new AuthController();

export default authController;
