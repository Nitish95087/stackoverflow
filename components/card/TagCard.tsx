import Link from "next/link";
import React from "react";
import RenderTag from "../shared/RenderTag";

interface Props {
  id: string;
  name: string;
  questions: number;
  description: string;
}

const TagCard = ({ id, name, questions, description }: Props) => {
  return (
    <Link
      href={`/tags/${id}`}
      className="background-light900_dark200 light-border flex min-h-[200px] w-full flex-col items-start gap-2 rounded-2xl border p-8 shadow-light-300 dark:shadow-none"
    >
      <RenderTag tag={name} />

      <p className="small-regular text-dark400_light700">{description}</p>

      <p className="small-medium text-dark400_light500">
        <span className="text-primary-500">{questions}+</span> Questions
      </p>
    </Link>
  );
};

export default TagCard;
