import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col gap-10">
      <h2
        className="h2-bold md:h1-bold
       text-dark100_light900"
      >
        Edit Question
      </h2>
      <div className="w-full">
        <Skeleton className="background-light800_dark400 h-5 w-1/5" />
        <Skeleton className="background-light800_dark400 mt-3 h-12 w-full" />
      </div>
      <div className="w-full">
        <Skeleton className="background-light800_dark400 h-5 w-2/5" />
        <Skeleton className="background-light800_dark400 mt-3 h-80 w-full" />
      </div>

      <div className="w-full">
        <Skeleton className="background-light800_dark400 h-5 w-1/5" />
        <Skeleton className="background-light800_dark400 mt-3 h-12 w-full" />
      </div>

      <Skeleton className="background-light800_dark400 h-10 w-1/5" />
    </div>
  );
};

export default loading;
