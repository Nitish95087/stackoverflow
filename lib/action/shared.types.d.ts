import { IUser } from "@/database/user.model";
import { Schema } from "mongoose";

export interface createQuestionParams {
  title: string;
  content: string;
  tags: string[];
  author: Schema.Types.ObjectId | IUser;
  path: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  picture: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updatedData: {
    name: string;
    username: string;
    email: string;
    picture: string;
  };
  path: string;
}

export interface DeleteUserParams {
  clerkId: string;
}

export interface GetUserByIdParams {
  userId: string;
}

export interface GetAllUserParams {}

export interface GetTopUserTagParams {
  clerkId: string;
}

export interface GetQuestionDetailProps {
  _id: string;
}

export interface UpVoteQuestionParams {
  id: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path: string;
}

export interface DownVoteQuestionParams {
  id: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path: string;
}

export interface ToggleSaveParams {
  id: string;
  userId: string;
  hasSaved: boolean;
  path: string;
}

export interface CreateAnswerProps {
  params: {
    author: string;
    question: string;
    answerContent: string;
    upvotes?: string[];
    downvotes?: string[];
  };
  path: string;
}

export interface AnswerProps {
  authorId: string;
  questionId: string;
}

export interface GetAnswerAuthorProps {
  questionId: string;
}

export interface UpvoteAnswerProps {
  id: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path: string;
}

export interface DownvoteAnswerProps {
  id: string;
  userId: string;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  path: string;
}

export interface GetSavedQuestionsProps {
  userId: string | null;
}

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export interface TopPostsProps {
  authorId: string;
}
