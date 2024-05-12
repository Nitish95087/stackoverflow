"use client";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/action/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  placeholder?: string;
  route: string;
}

const LocalSearch = ({ placeholder, route }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get("q");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newQuery = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: search,
        });
        router.push(newQuery, { scroll: false });
      } else if (pathname === route) {
        const newQuery = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["q"],
        });
        router.push(newQuery, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [route, router, search, pathname, searchParams]);

  return (
    <div className="background-light800_darkgradient relative flex min-h-[56px] flex-1 items-center gap-4 rounded-xl px-4 shadow-light-300 dark:shadow-none">
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
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LocalSearch;
