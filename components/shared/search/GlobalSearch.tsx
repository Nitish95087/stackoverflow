"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import GlobalResult from "./GlobalResult";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/action/utils";

const GlobalSearch = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchContainerRef = useRef(null);
  const query = searchParams.get("global");

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFunction = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["global", "type"],
          });

          router.push(newUrl, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFunction);
  }, [search, pathname, router, searchParams, query]);

  return (
    <div
      className="relative w-full max-w-[550px] max-md:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-xl px-4  shadow-light-300 dark:shadow-dark-200">
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
            className="body-regular placeholder no-focus text-dark400_light700 border-none bg-transparent p-0 shadow-none outline-none focus-visible:ring-0 dark:bg-transparent"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === "" && isOpen) {
                setIsOpen(false);
              }
            }}
          />
        </div>
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
