import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
  return (
    <section className="flex flex-col gap-5 space-y-3">
      <div className="w-full">
        <Skeleton className="background-light800_dark400 h-12 w-1/5 rounded-xl" />
      </div>

      <Skeleton className="background-light800_dark400 h-12 w-full rounded-xl" />

      <div className="my-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2].map((item) => (
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
