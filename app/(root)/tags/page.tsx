import TagCard from "@/components/card/TagCard";
import Filter from "@/components/shared/Filter";
import PaginationCard from "@/components/shared/PaginationCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { TagsFilter } from "@/constants/filters";
import { getAllTag } from "@/lib/action/tag.action";
import React from "react";

const Tags = async () => {
  const tagCard = await getAllTag();

  return (
    <div className="flex flex-col gap-3">
      <h1 className="h2-bold sm:h1-bold text-dark100_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch placeholder="Search by tag name" />
        <Filter trigger="Select a Filter" content={TagsFilter} />
      </div>

      <div className="my-5 grid w-full grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-3">
        {tagCard.map((item) => (
          <TagCard
            key={item.id}
            id={item.id}
            name={item.name}
            questions={item.questions.length}
            description={
              "Javascript, often abbreviated as JS, is a programming language that is one of the core technologies of the world wide web, alongside HTML, and CSS"
            }
          />
        ))}
      </div>

      <PaginationCard />
    </div>
  );
};

export default Tags;
