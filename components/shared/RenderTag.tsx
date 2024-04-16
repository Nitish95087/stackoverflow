import React from "react";
import { Badge } from "../ui/badge";

const RenderTag = ({ tag }: { tag: string }) => {
  return (
    <Badge className="hover:background-light800_dark300 text-light400_light500 background-light800_dark400 w-fit cursor-pointer rounded-md px-4 py-2">
      {tag}
    </Badge>
  );
};

export default RenderTag;
