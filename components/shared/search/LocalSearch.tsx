import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface Props {
  placeholder?: string;
}

const LocalSearch = ({ placeholder }: Props) => {
  return (
    <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-xl px-4 shadow-light-300 dark:shadow-none">
      <Image
        src={"/assets/icons/search.svg"}
        alt="search"
        width={24}
        height={24}
      />
      <div className="size-full ">
        <Input
          type="text"
          placeholder={placeholder || "Search Locally"}
          className="body-regular placeholder no-focus text-dark400_light700 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0 dark:bg-transparent"
        />
      </div>
    </div>
  );
};

export default LocalSearch;
