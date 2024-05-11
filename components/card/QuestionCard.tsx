import React from "react";
import RenderTag from "../shared/RenderTag";
import Metrix from "../shared/Metrix";
import { formatNumber, getTimeAgo } from "@/lib/action/utils";
import Link from "next/link";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  views: number;
  answers: string[];
  createdAt: Date;
  clerkId?: string | null | undefined;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  clerkId,
}: QuestionProps) => {
  return (
    <div className="background-light900_dark200 flex flex-col gap-3 rounded-xl px-10 py-9">
      <Link href={`/question/${_id}`}>
        <h2 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
          {title}
        </h2>
      </Link>
      <div className="flex items-center justify-start gap-5">
        {tags.length > 0 && (
          <>
            {tags.map((item) => (
              <RenderTag key={item._id} tag={item.name} />
            ))}
          </>
        )}
      </div>

      <div className="flex flex-wrap items-start justify-between gap-2">
        <Metrix
          imgUrl={author?.picture}
          alt={author?.name}
          value={author?.name}
          title={getTimeAgo(createdAt)}
          isAuthor={true}
          href={`/profile/${author?.clerkId}`}
          textStyles="text-dark200_light900 body-regular"
        />

        <div className="flex  items-center gap-3">
          <Metrix
            imgUrl="/assets/icons/like.svg"
            alt="like"
            value={formatNumber(upvotes.length)}
            title="Votes"
            isAuthor={false}
            textStyles="text-dark200_light900 body-regular"
          />
          <Metrix
            imgUrl="/assets/icons/message.svg"
            alt="answer"
            value={formatNumber(answers.length)}
            title={answers.length === 1 ? "Answer" : "Answers"}
            isAuthor={false}
            textStyles="text-dark200_light900 body-regular"
          />
          <Metrix
            imgUrl="/assets/icons/eye.svg"
            alt="view"
            value={formatNumber(views || 0)}
            title="Votes"
            isAuthor={false}
            textStyles="text-dark200_light900 body-regular"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
