import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section className="flex flex-col gap-5 space-y-3">
      <h2
        className="h2-bold md:h1-bold
       text-dark100_light900"
      >
        Users
      </h2>
      <div className="flex w-full flex-col gap-5 md:flex-row">
        <Skeleton className="background-light800_dark400 h-12 w-full rounded-xl md:w-4/5" />
        <Skeleton className="background-light800_dark400 h-12 w-full rounded-xl md:w-1/4" />
      </div>

      <div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            key={item}
            className="background-light800_dark400 w- h-[150px] rounded-xl"
          />
        ))}
      </div>
    </section>
  );
};

export default loading;
