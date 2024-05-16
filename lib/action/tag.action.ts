import Tag from "@/database/tag.model";
import { connectToDB } from "../mongoose";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";

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

interface GetAllTagProps {
  searchQuery: string;
  filter: string;
  page: number;
  pageSize?: number;
}

export const getAllTag = async ({
  searchQuery,
  filter,
  page = 1,
  pageSize = 10,
}: GetAllTagProps) => {
  try {
    await connectToDB();

    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdOn: -1 };
        break;
      case "name":
        sortOptions = { name: -1 };
        break;
      case "old":
        sortOptions = { createdOn: 1 };
        break;
      default:
        break;
    }

    const allTag = await Tag.find(query)
      .skip(skipAmount)
      .limit(pageSize)
      .sort(sortOptions);

    const totalTags = await Tag.countDocuments(query);

    const isNext = totalTags > skipAmount + allTag.length;

    return { tagCard: allTag, isNext };
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
