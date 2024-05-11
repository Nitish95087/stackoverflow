"use client";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { HomePageFilters } from "@/constants/filters";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery } from "@/lib/action/utils";

const RenderFilter = () => {
  const [active, setActive] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterButton = (id: number, value: string) => {
    const activeButton = HomePageFilters.find((item) => item.id === id);

    setActive(activeButton!.value);

    if (active === value) {
      setActive("");

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newUrl, { scroll: false });
    } else {
      setActive(value);

      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: value.toLowerCase(),
      });

      router.push(newUrl, { scroll: false });
    }
  };

  return (
    <div className="flex items-center justify-start gap-5 max-md:hidden">
      {HomePageFilters.map((tag) => {
        return (
          <Badge
            key={tag.id}
            className={` w-fit cursor-pointer rounded-md px-4 py-2 ${active === tag.value ? "bg-primary-100 text-primary-500" : "text-light400_light500 background-light800_dark400"}`}
            onClick={() => {
              handleFilterButton(tag.id, tag.value);
            }}
          >
            {tag.label}
          </Badge>
        );
      })}
    </div>
  );
};

export default RenderFilter;
