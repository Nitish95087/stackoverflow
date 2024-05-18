import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section className="flex flex-col space-y-3">
      <div className="flex flex-col">
        <div className="flex justify-between">
          <h1 className="h1-bold text-dark100_light900">All Questions</h1>
          <Skeleton className="background-light800_dark400 h-10 w-1/5 rounded-xl" />
        </div>

        <div className="my-5 flex flex-col gap-10">
          <Skeleton className="background-light800_dark400 h-[55px] w-full rounded-xl" />
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton
                key={item}
                className="background-light800_dark400 h-[40px] w-1/5 rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            key={item}
            className="background-light800_dark400 h-[150px] w-full rounded-xl"
          />
        ))}
      </div>
    </section>
  );
};

export default loading;
