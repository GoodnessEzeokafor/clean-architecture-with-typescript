import { mongoConnection } from "app";
import { DB_BLOG_COLLECTION, MongoGetDatabase } from "config/database";
import Logger from "config/winston";
import { BlogRepository } from "repository/blog/blog.repository";

export const initializeBlogRepository = async() => {
  try {
    const db = await MongoGetDatabase(mongoConnection);
    return new BlogRepository(db, DB_BLOG_COLLECTION);
  } catch (e) {
    Logger.error(e);
    throw e;
  }
}