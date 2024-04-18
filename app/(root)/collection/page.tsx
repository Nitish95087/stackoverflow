import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import PaginationCard from "@/components/shared/PaginationCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { cardQuestions } from "@/constants";
import { QuestionFilters } from "@/constants/filters";
import React from "react";

const Collection = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="h2-bold sm:h1-bold text-dark100_light900">
          Saved Questions
        </h1>

        <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
          <LocalSearch placeholder="Search saved questions..." />
          <Filter trigger="Select a Filter" content={QuestionFilters} />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {cardQuestions.map((item) => (
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

      <PaginationCard />
    </div>
  );
};

export default Collection;
