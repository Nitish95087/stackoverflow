"use server";

import Answer from "@/database/answer.model";
import { connectToDB } from "../mongoose";
import {
  CreateAnswerProps,
  DownvoteAnswerProps,
  GetAnswerAuthorProps,
  UpvoteAnswerProps,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import User from "@/database/user.model";

export const createAnswer = async ({ params, path }: CreateAnswerProps) => {
  try {
    await connectToDB();

    const newAnswer = await Answer.create(params);

    //   push answer newAnswer key to Question document
    await Question.findByIdAndUpdate(params.question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllAnswers = async () => {
  try {
    await connectToDB();

    const allAnswer = await Answer.find({}).sort({ createdAt: -1 });

    return allAnswer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAnswer = async (params: GetAnswerAuthorProps) => {
  try {
    await connectToDB();

    const { questionId } = params;

    const answer = await Answer.find({ question: questionId }).populate({
      path: "author",
      model: User,
      select: "_id clerkId name picture",
    });

    return answer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const upvoteAnswer = async (params: UpvoteAnswerProps) => {
  try {
    await connectToDB();

    const { id, userId, hasUpVoted, hasDownVoted, path } = params;

    let updateQuery = {};

    if (hasUpVoted) {
      updateQuery = { $pull: { upvotes: userId } };
    } else if (hasDownVoted) {
      updateQuery = {
        $pull: { downvotes: userId },
        $push: { upvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { upvotes: userId } };
    }

    await Answer.findByIdAndUpdate(id, updateQuery, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downvoteAnswer = async (params: DownvoteAnswerProps) => {
  try {
    await connectToDB();

    const { id, userId, hasUpVoted, hasDownVoted, path } = params;

    let updateQuery = {};

    if (hasDownVoted) {
      updateQuery = { $pull: { downvotes: userId } };
    } else if (hasUpVoted) {
      updateQuery = {
        $pull: { upvotes: userId },
        $push: { downvotes: userId },
      };
    } else {
      updateQuery = { $addToSet: { downvotes: userId } };
    }

    await Answer.findByIdAndUpdate(id, updateQuery, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopUserAnswer = async ({ userId }: { userId: string }) => {
  try {
    await connectToDB();

    const topAnswer = await Answer.find({ author: userId })
      .populate({ path: "question", model: Question })
      .populate({ path: "author", model: User })
      .sort({ upvotes: -1 });

    return topAnswer;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
