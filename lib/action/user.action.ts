"use server";
import User from "@/database/user.model";
import { connectToDB } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetUserByIdParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";

export const createUser = async (params: CreateUserParams) => {
  try {
    connectToDB();

    const newUser = await User.create(params);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (params: UpdateUserParams) => {
  try {
    connectToDB();

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
    connectToDB();

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
    connectToDB();

    const mongoUser = await User.findOne(params);

    return mongoUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
