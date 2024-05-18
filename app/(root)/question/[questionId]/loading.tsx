import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex w-full justify-end">
        <Skeleton className="background-light800_dark400 h-8 w-1/4 rounded-xl" />
      </div>
      <div className="flex w-full justify-start">
        <Skeleton className="background-light800_dark400 h-8 w-1/4 rounded-xl" />
      </div>

      <Skeleton className="background-light800_dark400 h-12 w-full " />

      <div className="flex items-center justify-start gap-3">
        {[1, 2, 3].map((item) => (
          <Skeleton
            key={item}
            className="background-light800_dark400 h-8 w-1/5 rounded-xl"
          />
        ))}
      </div>

      <Skeleton className="background-light800_dark400 h-80 w-full rounded-xl" />

      <Skeleton className="background-light800_dark400 h-8 w-1/5 rounded-xl" />
    </div>
  );
};

export default loading;
