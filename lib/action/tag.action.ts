import Tag from "@/database/tag.model";
import { connectToDB } from "../mongoose";
import Question from "@/database/question.model";
import User from "@/database/user.model";

export const getPopularTag = async () => {
  try {
    await connectToDB();

    const popularTag = Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestoins: -1 } },
      { $limit: 5 },
    ]);

    return popularTag;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllTag = async () => {
  try {
    await connectToDB();

    const allTag = Tag.find({});

    return allTag;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getSpecificTag = async (params: { tagId: string }) => {
  try {
    await connectToDB();

    const { tagId } = params;

    const tag = await Tag.findById({ _id: tagId }).populate({
      path: "questions",
      model: Question,
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    return tag;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTopTag = async () => {
  try {
    await connectToDB();

    const topTag = Tag.find({}).sort({ questions: -1 }).limit(10);

    return topTag;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
