import Link from "next/link";
import React from "react";
import RenderTag from "./RenderTag";
import { getTopTag } from "@/lib/action/tag.action";

const TopTag = async () => {
  const topTags = await getTopTag();

  return (
    <>
      <h3 className="h3-bold text-dark200_light900">Popular Tag</h3>
      <div className="mt-8 flex flex-col gap-5">
        {topTags.map((tag) => (
          <Link
            href={`/tags/${tag._id}`}
            key={tag._id}
            className="flex items-center justify-between gap-3"
          >
            <RenderTag tag={tag.name} />
            <p className="text-dark400_light700 small-regular">
              {tag.questions.length}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TopTag;
