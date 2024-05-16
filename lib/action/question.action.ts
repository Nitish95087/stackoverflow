"use server";
import Question from "@/database/question.model";
import { connectToDB } from "../mongoose";
import {
  DownVoteQuestionParams,
  EditQuestionProps,
  GetAllQuestionProps,
  GetQuestionDetailProps,
  TopPostsProps,
  UpVoteQuestionParams,
  createQuestionParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import { FilterQuery } from "mongoose";

export const createQuestion = async (params: createQuestionParams) => {
  try {
    // connect to database
    await connectToDB();

    const { title, content, author, tags, path } = params;

    // create question

    const question = await Question.create({
      title,
      content,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        {
          $setOnInsert: { name: tag, author: question.author },
          $push: { questions: question._id },
        },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllQuestion = async (params: GetAllQuestionProps) => {
  try {
    await connectToDB();

    const { searchQuery, filter, page = 1, pageSize = 20 } = params;

    // Calculate the number of posts to skip based on the page number and page size
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { content: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;
      case "frequent":
        sortOptions = { views: -1 };
        break;
      case "unanswered":
        query.answers = { $size: 0 };
        break;
      default:
        break;
    }

    const allQuestion = await Question.find(query)
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User })
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalQuestions = await Question.countDocuments(query);

    const isNext = totalQuestions > skipAmount + allQuestion.length;

    return { allQuestion, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getPopularQuestion = async () => {
  try {
    await connectToDB();

    const popularQuestion = Question.find({})
      .sort({ views: -1, upvotes: -1 })
      .limit(5);

    return popularQuestion;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuestionDetail = async ({ _id }: GetQuestionDetailProps) => {
  try {
    await connectToDB();

    const questionDetail = Question.findById({ _id })
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture author",
      });

    return questionDetail;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const upvoteQuestion = async (params: UpVoteQuestionParams) => {
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

    await Question.findByIdAndUpdate(id, updateQuery, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const downvoteQuestion = async (params: DownVoteQuestionParams) => {
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

    await Question.findByIdAndUpdate(id, updateQuery, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const topPosts = async (params: TopPostsProps) => {
  try {
    await connectToDB();

    const { authorId } = params;

    const topPosts = await Question.find({ author: authorId })
      .populate({ path: "author", model: User })
      .populate({ path: "tags", model: Tag })
      .sort({
        views: -1,
        upvotes: -1,
      });

    return topPosts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteQuestion = async ({
  questionId,
  path,
}: {
  questionId: string;
  path: string;
}) => {
  try {
    await connectToDB();

    await Question.deleteOne({
      _id: questionId,
    });

    // Note Delete all answer of this quesiton
    await Answer.deleteMany({ question: questionId });
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getQuestionById = async ({ id }: { id: string }) => {
  try {
    await connectToDB();

    const question = await Question.findOne({ _id: id }).populate({
      path: "tags",
      model: Tag,
    });

    return question;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editQuestion = async ({
  _id,
  updatedTitle,
  updatedContent,
}: EditQuestionProps) => {
  try {
    await connectToDB();

    await Question.findByIdAndUpdate(
      { _id },
      { title: updatedTitle, content: updatedContent },
      { new: true }
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};
