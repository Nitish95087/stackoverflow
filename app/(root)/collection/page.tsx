import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import PaginationCard from "@/components/shared/PaginationCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
// import { cardQuestions } from "@/constants";
import { QuestionFilters } from "@/constants/filters";
import { getSavedQuestions } from "@/lib/action/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Collection = async () => {
  const { userId } = auth();

  const savedQuestions = await getSavedQuestions({ userId });

  console.log(savedQuestions);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="h2-bold sm:h1-bold text-dark100_light900">
          Saved Questions
        </h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch
            placeholder="Search saved questions..."
            route="/collection"
          />
          <Filter trigger="Select a Filter" content={QuestionFilters} />
        </div>
      </div>
      {savedQuestions.saved.length > 0 ? (
        <div className="flex flex-col gap-5">
          {savedQuestions.saved.map((item: any) => (
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
          ))}
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <NoResult
            title="There&rsquo;s no saved question"
            description="To see saved question start saving questions"
          />
        </div>
      )}

      <PaginationCard />
    </div>
  );
};

export default Collection;
