import React from "react";
import RenderTag from "../shared/RenderTag";
import Metrix from "../shared/Metrix";
import { formatNumber, getTimeAgo } from "@/lib/action/utils";
import Link from "next/link";
import EditDeletePost from "../shared/EditDeletePost";
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
  isAuthor?: boolean;
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
  isAuthor,
}: QuestionProps) => {
  return (
    <div className="card-wrapper flex min-h-[50px] flex-col gap-5 rounded-xl px-5 py-4 md:px-10 md:py-9">
      <div className="flex items-start justify-between gap-1">
        <Link href={`/question/${_id}`} className="max-w-[80%]">
          <h2 className="sm:h3-semibold base-semibold text-dark200_light900  flex-1">
            {title}
          </h2>
        </Link>
        {isAuthor && <EditDeletePost id={_id} />}
      </div>

      <div className="flex flex-wrap items-center justify-start gap-5">
        {tags.length > 0 &&
          tags.map((item) => (
            <Link key={item._id} href={`tags/${item._id}`}>
              <RenderTag tag={item.name} />
            </Link>
          ))}
      </div>

      <div className="flex flex-wrap items-start justify-between gap-3">
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
