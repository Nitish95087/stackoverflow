"use server";
import User from "@/database/user.model";
import { connectToDB } from "../mongoose";
import { CreateUserParams } from "./shared.types";

export const createUser = (parmas: CreateUserParams) => {
  try {
    connectToDB();

    const newUser = User.create(parmas);

    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
