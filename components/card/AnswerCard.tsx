import React from "react";
import Metrix from "../shared/Metrix";
import { formatNumber, getTimeAgo } from "@/lib/action/utils";
import Link from "next/link";

interface AnswerCardProps {
  _id: string;
  title: string;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({
  _id,
  title,
  author,
  upvotes,
  createdAt,
}: AnswerCardProps) => {
  return (
    <div className="background-light900_dark200 flex flex-col gap-3 rounded-xl px-10 py-9">
      <Link href={`/question/${_id}`}>
        <h2 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
          {title}
        </h2>
      </Link>

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
        <Metrix
          imgUrl="/assets/icons/like.svg"
          alt="like"
          value={formatNumber(upvotes.length)}
          title="Votes"
          isAuthor={false}
          textStyles="text-dark200_light900 body-regular"
        />
      </div>
    </div>
  );
};

export default AnswerCard;
