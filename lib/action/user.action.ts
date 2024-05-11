"use server";
import User from "@/database/user.model";
import { connectToDB } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetSavedQuestionsProps,
  GetTopUserTagParams,
  GetUserByIdParams,
  ToggleSaveParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";

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

export const getAllUser = async () => {
  try {
    await connectToDB();

    const users = User.find();

    return users;
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

    const { userId } = params;

    const savedQuestion = await User.findOne({ clerkId: userId }).populate({
      path: "saved",
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    return savedQuestion;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
