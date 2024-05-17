"use server";

import Question from "@/database/question.model";
import { connectToDB } from "../mongoose";
import User from "@/database/user.model";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.model";

interface GlobalSearchProps {
  query?: string | null;
  type?: string | null;
}

const SearchableTypes = ["question", "answer", "user", "tag"];

export const globalSearch = async (params: GlobalSearchProps) => {
  try {
    await connectToDB();

    const { query, type } = params;

    const regexQuery = { $regex: query, $options: "i" };

    let results: any = [];

    const modelAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !SearchableTypes.includes(typeLower)) {
      // search accross everthings

      for (const { model, searchField, type } of modelAndTypes) {
        const queryResult = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResult.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      // search in specific model
      const modelInfo = modelAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("invalid search type");
      }

      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log("Error fetching global result", error);
    throw error;
  }
};
