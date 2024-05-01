import React from "react";
import RenderTag from "../shared/RenderTag";
import Metrix from "../shared/Metrix";
import { getTimeAgo } from "@/lib/action/utils";

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
      <h2 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
        {title}
      </h2>
      <div className="flex items-center justify-start gap-5">
        {tags.length > 0 && (
          <>
            {tags.map((item) => (
              <RenderTag key={item._id} tag={item.name} />
            ))}
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Metrix
          imgUrl={author?.picture}
          alt={author?.name}
          value={author?.name}
          title={getTimeAgo(createdAt)}
          isAuthor={true}
          href={`/profile/${author?.clerkId}`}
          textStyles="text-dark200_light900 body-regular"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Metrix
            imgUrl="/assets/icons/like.svg"
            alt="like"
            value={upvotes.length}
            title="Votes"
            isAuthor={false}
            textStyles="text-dark200_light900 body-regular"
          />
          <Metrix
            imgUrl="/assets/icons/message.svg"
            alt="answer"
            value={answers.length}
            title={answers.length === 1 ? "Answer" : "Answers"}
            isAuthor={false}
            textStyles="text-dark200_light900 body-regular"
          />
          <Metrix
            imgUrl="/assets/icons/eye.svg"
            alt="view"
            value={views}
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
