"use server";
import Question from "@/database/question.model";
import { connectToDB } from "../mongoose";
import { createQuestionParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import Tag from "@/database/tag.model";

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

    await Question.findByIdAndUpdate(question._id, {
      $push: { $tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
