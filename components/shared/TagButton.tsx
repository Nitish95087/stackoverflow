import React from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";

type Props = {
  tag: string;
  field: string[];
  handleRemoveTag: (tag: string, field: any) => void;
};

const TagButton = ({ tag, field, handleRemoveTag }: Props) => {
  return (
    <Badge
      key={tag}
      className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-md border-none px-4 py-2 capitalize"
    >
      {tag}

      <Image
        src={"/assets/icons/close.svg"}
        alt="Close icon"
        width={12}
        height={12}
        className="cursor-pointer object-contain invert-0 dark:invert"
        onClick={() => {
          handleRemoveTag(tag, field);
        }}
      />
    </Badge>
  );
};

export default TagButton;
