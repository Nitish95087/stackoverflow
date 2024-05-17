"use server";
import User from "@/database/user.model";
import { connectToDB } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetSavedQuestionsProps,
  GetUserByIdParams,
  ToggleSaveParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import { BadgeCriteriaType } from "@/types";
import { assignBadge } from "./utils";

export const createUser = async (params: CreateUserParams) => {
  try {
    await connectToDB();

    const newUser = await User.create(params);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    await connectToDB();

    const { clerkId, updatedData, path } = params;

    await User.findOneAndUpdate({ clerkId }, updatedData, { new: true });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (params: DeleteUserParams) => {
  try {
    await connectToDB();

    const { clerkId } = params;

    const user = await User.findOneAndDelete({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    // Task:
    // delete everything from database
    // delete questions, answers, comment and son on
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserById = async (params: GetUserByIdParams) => {
  try {
    await connectToDB();

    const { userId } = params;

    const mongoUser = await User.findOne({ clerkId: userId });

    return mongoUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface GetAllUserProps {
  searchQuery: string;
  filter: string;
  page: number;
  pageSize?: number;
}

export const getAllUser = async ({
  searchQuery,
  filter,
  page = 1,
  pageSize = 10,
}: GetAllUserProps) => {
  try {
    await connectToDB();
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case "new_users":
        sortOptions = { joinedAt: -1 };
        break;
      case "old_user":
        sortOptions = { joinedAt: 1 };
        break;
      case "top_contributors":
        sortOptions = { reputation: -1 };
        break;
    }

    const users = await User.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalUsers = await User.countDocuments(query);

    const isNext = totalUsers > skipAmount + users.length;

    return { users, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopUserTag = async () => {
  try {
    await connectToDB();

    const topTag = Tag.find({}).limit(3);

    return topTag;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const toggleSave = async (params: ToggleSaveParams) => {
  try {
    await connectToDB();

    const { id, userId, hasSaved, path } = params;

    if (hasSaved) {
      await User.findByIdAndUpdate(userId, { $pull: { saved: id } });
    } else {
      await User.findByIdAndUpdate(userId, { $push: { saved: id } });
    }

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSavedQuestions = async (params: GetSavedQuestionsProps) => {
  try {
    await connectToDB();

    const { userId, searchQuery, filter, page = 1, pageSize = 5 } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};

    let sortOptions = {};

    switch (filter) {
      case "most_recent":
        sortOptions = { createdAt: -1 };
        break;
      case "oldest":
        sortOptions = { createdAt: 1 };
        break;
      case "most_voted":
        sortOptions = { upvotes: -1 };
        break;
      case "most_viewed":
        sortOptions = { views: -1 };
        break;
      case "most_answered":
        sortOptions = { answers: -1 };
        break;
      default:
        break;
    }

    const savedQuestions = await User.findOne({ clerkId: userId }).populate({
      path: "saved",
      match: query,
      options: {
        sort: sortOptions,
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    const isNext = savedQuestions.saved.length > pageSize;

    return { savedQuestions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

interface GetUserInfoProps {
  userId: string;
}

export const getUserInfo = async (params: GetUserInfoProps) => {
  try {
    await connectToDB();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    if (!user) {
      throw new Error("User not found");
    }

    const totalQuestions = await Question.countDocuments({ author: user._id });

    const totalAnswers = await Answer.countDocuments({ author: user._id });

    const [questionUpvotes] = await Question.aggregate([
      { $match: { author: user._id } },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          totalUpvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [answerUpvotes] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const [questionViews] = await Answer.aggregate([
      { $match: { author: user._id } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const criteria = [
      { type: "QUESTION_COUNT" as BadgeCriteriaType, count: totalQuestions },
      { type: "ANSWER_COUNT" as BadgeCriteriaType, count: totalAnswers },
      {
        type: "QUESTION_UPVOTES" as BadgeCriteriaType,
        count: questionUpvotes?.totalUpvotes || 0,
      },
      {
        type: "ANSWER_UPVOTES" as BadgeCriteriaType,
        count: answerUpvotes?.totalUpvotes || 0,
      },
      {
        type: "TOTAL_VIEWS" as BadgeCriteriaType,
        count: questionViews?.totalViews || 0,
      },
    ];

    const badgeCount = assignBadge({ criteria });

    return {
      user,
      totalQuestions,
      totalAnswers,
      badgeCount,
      reputation: user.reputation,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
