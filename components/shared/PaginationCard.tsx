import React from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PaginationCard = () => {
  return (
    <div>
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
  );
};

export default PaginationCard;
