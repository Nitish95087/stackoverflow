import QuestionCard from "@/components/card/QuestionCard";
import Filter from "@/components/shared/Filter";
import RenderTag from "@/components/shared/RenderTag";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { cardQuestions } from "@/constants";
import { HomePageFilters } from "@/constants/filters";
import Link from "next/link";
import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const page = () => {
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
          <LocalSearch />
          <Filter
            trigger="Select a Filter"
            content={HomePageFilters}
            otherClasses="hidden max-md:flex"
          />
        </div>

        <div className="flex items-center justify-start gap-5 max-md:hidden">
          {HomePageFilters.map((item) => (
            <RenderTag key={item.id} tag={item.label} />
          ))}
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

      <div className="">
        <Pagination>
          <PaginationContent>
            <PaginationItem className="background-light800_dark300 text-dark300_light700">
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem className="background-light800_dark300 text-dark300_light700 ">
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>

            <PaginationItem className="background-light800_dark300 text-dark300_light700 ">
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default page;
