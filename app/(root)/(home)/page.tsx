import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import PaginationCard from "@/components/shared/PaginationCard";
import RenderFilter from "@/components/shared/RenderFilter";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import { getAllQuestion } from "@/lib/action/question.action";
import Link from "next/link";
import React from "react";

const page = async () => {
  const cardQuestions = await getAllQuestion();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
          <h1 className="h2-bold sm:h1-bold text-dark100_light900">
            All Questions
          </h1>

          <Link
            href={"/ask-question"}
            className="flex justify-end max-sm:w-full"
          >
            <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
              Ask a Question
            </Button>
          </Link>
        </div>

        <div className="my-5 flex flex-col  gap-3 sm:flex">
          <LocalSearch placeholder="Search questions..." />
          <Filter
            trigger="Select a Filter"
            content={HomePageFilters}
            otherClasses="hidden max-md:flex"
          />
        </div>

        <RenderFilter />
      </div>
      <div className="">
        {cardQuestions.length > 0 ? (
          <div className="flex flex-col gap-5">
            {cardQuestions.map((item) => {
              return (
                <QuestionCard
                  key={item._id}
                  _id={item._id}
                  title={item.title}
                  tags={item.tags}
                  author={item.author}
                  upvotes={item.upvotes}
                  views={item.views}
                  answers={item.answers}
                  createdAt={item.createdAt}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex w-full items-center justify-center">
            <NoResult
              title="There&rsquo;s no question to show"
              description="Be the first to break the silence 🚀 Ask a question and start discussion Our query could be next big thing other learn from Get Involve"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          </div>
        )}
      </div>

      <PaginationCard />
    </div>
  );
};

export default page;
