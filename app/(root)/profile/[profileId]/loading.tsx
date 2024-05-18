import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Skeleton className="background-light800_dark400 size-40 rounded-full md:w-1/5" />

        <div className="flex w-full flex-col justify-start gap-5 md:w-4/5">
          <Skeleton className="background-light800_dark400 h-8 w-[30%] rounded-xl" />
          <Skeleton className="background-light800_dark400 h-6 w-[15%] rounded-xl" />

          <div className="flex items-center justify-start gap-2">
            {[1, 2, 3].map((item) => (
              <Skeleton
                key={item}
                className="background-light800_dark400 h-8 w-[30%] rounded-xl"
              />
            ))}
          </div>

          <Skeleton className="background-light800_dark400 h-20 w-full rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            key={item}
            className="background-light800_dark400 h-20  rounded-xl"
          />
        ))}
      </div>
    </div>
  );
};

export default loading;
