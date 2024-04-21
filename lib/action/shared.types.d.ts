import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface createQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author?: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}
