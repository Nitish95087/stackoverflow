import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section className="flex flex-col gap-5 space-y-3">
      <h2
        className="h2-bold md:h1-bold
       text-dark100_light900"
      >
        Saved Questions
      </h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Skeleton className="background-light800_dark400 h-12 w-full rounded-xl md:w-4/5" />
        <Skeleton className="background-light800_dark400 h-12 w-full rounded-xl md:w-1/4" />
      </div>

      <div className="my-5 flex flex-col gap-5">
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
