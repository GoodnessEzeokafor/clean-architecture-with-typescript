import { ObjectId } from "mongodb";

export type IBlog = {
  _id?: ObjectId | undefined;
  post: string;
  content: string;
  createdAt: Date;
  updatedAt: Date
}