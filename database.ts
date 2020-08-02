import { Database, Relationships, DataTypes, Model } from "./deps.ts";
// import User from "./models/User.ts";
// import Subreddit from "./models/Subreddit.ts";
// import Post from "./models/Post.ts";

const db = new Database("sqlite3", {
  filepath: "./database.sqlite",
});

export class User extends Model {
  static table = "users";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    karma: DataTypes.INTEGER,
  };

  static subreddits() {
    this.hasMany(Subreddit);
  }
}

export class Subreddit extends Model {
  static table = "subreddits";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  };

  static users() {
    return this.hasMany(User);
  }

  static posts() {
    return this.hasMany(Post);
  }
}

export class Post extends Model {
  static table = "posts";
  static timestamps = true;

  static fields = {
    id: { primaryKey: true, autoIncrement: true },
    subreddit_id: Relationships.belongsTo(Subreddit),
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    image_video: DataTypes.STRING,
    lint: DataTypes.STRING,
    upvotes: DataTypes.INTEGER,
    type: DataTypes.STRING,
  };

  static subreddit() {
    return this.hasOne(Subreddit);
  }
}

export class Comment extends Model {
  static table = "comments";
  static timestamps = true;

  static fields: any = {
    id: { primaryKey: true, autoIncrement: true },
    post_id: Relationships.belongsTo(Post),
    user_id: Relationships.belongsTo(User),
    comment: DataTypes.STRING,
    parent_id: Relationships.belongsTo(Comment),
    upvotes: DataTypes.INTEGER,
  };

  static comments() {
    return this.hasMany(Comment);
  }

  static parentComment() {
    return this.hasOne(Comment);
  }
}

export class UpvoteDownvote extends Model {
  static table = "upvotes_downvotes";
  static timestamps = true;

  static fields: any = {
    id: { primaryKey: true, autoIncrement: true },
    post_id: Relationships.belongsTo(Post),
    comment_id: Relationships.belongsTo(Comment),
    user_id: Relationships.belongsTo(User),
    upvotes: DataTypes.STRING,
  };

  static comment() {
    return this.hasOne(Comment);
  }

  static post() {
    return this.hasOne(Post);
  }

  static user() {
    return this.hasOne(User);
  }
}

const SubredditUsers = Relationships.manyToMany(User, Subreddit);

db.link([User, Subreddit, SubredditUsers, Post, Comment, UpvoteDownvote]);
db.sync();
