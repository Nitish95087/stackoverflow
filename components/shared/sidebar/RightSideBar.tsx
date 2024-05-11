import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";
import { getPopularQuestion } from "@/lib/action/question.action";
import { getPopularTag } from "@/lib/action/tag.action";

const RightSideBar = async () => {
  const topQuestions = await getPopularQuestion();
  const topTags = await getPopularTag();
  return (
    <div className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-5 overflow-y-auto border p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div className="flex flex-col gap-2">
        <h3 className="h3-bold text-dark200_light900">Popular Questions</h3>
        <div className="mt-2 flex flex-col gap-5">
          {topQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex items-center justify-between gap-3"
            >
              <p className="body-medium text-dark400_light700">
                {question.title}
              </p>
              <Image
                src={"/assets/icons/chevron-right.svg"}
                alt="chevron"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="h3-bold text-dark200_light900">Popular Tag</h3>
        <div className="mt-2 flex flex-col gap-5">
          {topTags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="flex items-center justify-between gap-3"
            >
              <RenderTag tag={tag.name} />
              <p className="text-dark400_light700 small-regular">
                {tag.numberOfQuestions}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
