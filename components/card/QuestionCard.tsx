import React from "react";
import RenderTag from "../shared/RenderTag";
import Metrix from "../shared/Metrix";

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
  upvotes: number;
  views: number;
  answers: number;
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
        {tags.map((item) => (
          <RenderTag key={item._id} tag={item.name} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Metrix
          imgUrl={author.picture}
          alt={author.name}
          value={"Nitish"}
          title={"- asked 1 hour ago"}
          isAuthor={true}
          href="/profile/123"
          textStyles="text-dark200_light900 body-regular"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Metrix
            imgUrl="/assets/icons/like.svg"
            alt="like"
            value={upvotes}
            title="Votes"
            textStyles="text-dark200_light900 body-regular"
          />
          <Metrix
            imgUrl="/assets/icons/message.svg"
            alt="answer"
            value={answers}
            title={answers === 1 ? "Answer" : "Answers"}
            textStyles="text-dark200_light900 body-regular"
          />
          <Metrix
            imgUrl="/assets/icons/eye.svg"
            alt="view"
            value={views}
            title="Votes"
            textStyles="text-dark200_light900 body-regular"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
