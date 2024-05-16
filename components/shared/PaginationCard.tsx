"use client";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/action/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationCardProps {
  pageNumber: number;
  isNext: boolean;
}

const PaginationCard = ({ pageNumber, isNext }: PaginationCardProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "next" ? pageNumber + 1 : pageNumber - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        className="light-border-2 flex h-9 min-h-[36px] items-center justify-center gap-2 border px-4 py-2"
        disabled={pageNumber === 1}
        onClick={() => {
          handleNavigation("prev");
        }}
      >
        Prev
      </Button>
      <div className="flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2">
        <p className="body-semibold text-light-900">{pageNumber}</p>
      </div>
      <Button
        className="light-border-2 flex h-9 min-h-[36px] items-center justify-center gap-2 border px-4 py-2"
        disabled={!isNext}
        onClick={() => {
          handleNavigation("next");
        }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationCard;
