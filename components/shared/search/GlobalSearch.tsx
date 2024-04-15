import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const GlobalSearch = () => {
  return (
    <div className="relative w-full max-w-[600px] max-md:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl p-4 shadow-light-300 dark:shadow-dark-200">
        <Image
          src={"/assets/icons/search.svg"}
          alt="search"
          width={24}
          height={24}
        />
        <div className="size-full ">
          <Input
            type="text"
            placeholder="Search anything globally"
            className="paragraph-regular placeholder no-focus text-dark400_light700 border-none bg-transparent shadow-none outline-none focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
