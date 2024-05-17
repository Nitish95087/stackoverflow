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
import Interaction from "@/database/interaction.model";

export const createAnswer = async ({ params, path }: CreateAnswerProps) => {
  try {
    await connectToDB();

    const { question, author } = params;

    const newAnswer = await Answer.create(params);

    //   push answer newAnswer key to Question document
    const questionObject = await Question.findByIdAndUpdate(params.question, {
      $push: { answers: newAnswer._id },
    });

    // Todo Add interaction..
    await Interaction.create({
      user: author,
      action: "answer",
      question,
      answer: newAnswer._id,
      tags: questionObject,
    });

    await User.findByIdAndUpdate(author, { $inc: { reputation: 10 } });

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

    const answer = await Answer.find({
      question: JSON.parse(questionId),
    }).populate({
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

    const answer = await Answer.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Increment author's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasUpVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasUpVoted ? -10 : 10 },
    });

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

    const answer = await Answer.findByIdAndUpdate(id, updateQuery, {
      new: true,
    });

    if (!answer) {
      throw new Error("Answer not found");
    }

    // Icrement author's reputation
    await User.findByIdAndUpdate(userId, {
      $inc: { reputation: hasDownVoted ? -2 : 2 },
    });

    await User.findByIdAndUpdate(answer.author, {
      $inc: { reputation: hasDownVoted ? -10 : 10 },
    });

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

export const deleteAnswer = async ({
  _id,
  path,
}: {
  _id: string;
  path: string;
}) => {
  try {
    await connectToDB();

    const answer = await Answer.findById({ _id });

    if (!answer) {
      throw new Error("Answer not found");
    }

    await answer.deleteOne({ _id });
    await Question.updateMany(
      { _id: answer.question },
      { $pull: { answers: _id } }
    );
    await Interaction.deleteMany({ answer: _id });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
