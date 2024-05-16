"use server";

import Question from "@/database/question.model";
import { connectToDB } from "../mongoose";
import Interaction from "@/database/interaction.model";

interface ViewQuestionProps {
  questionId: string;
  userId: string;
}

export const viewQuestion = async (params: ViewQuestionProps) => {
  try {
    await connectToDB();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingTag = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      if (existingTag) return console.log("User already exist");

      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
