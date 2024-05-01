"use server";
import Question from "@/database/question.model";
import { connectToDB } from "../mongoose";
import { createQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";
import User from "@/database/user.model";

export const createQuestion = async (params: createQuestionParams) => {
  try {
    // connect to database
    await connectToDB();

    const { title, content, tags, author, path } = params;

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
        { $setOnInsert: { name: tag }, $push: { questions: question._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    // Note: Here is some bug related to tag array
    // console.log("QuestionId:", question._id, "TagDocument:", tagDocuments);
    await Question.findByIdAndUpdate(question._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    // console.log(updatedQuestion);

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllQuestion = async () => {
  try {
    await connectToDB();

    const allQuestion = Question.find()
      .populate({ path: "tags", model: Tag })
      .populate({ path: "author", model: User });

    return allQuestion;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
