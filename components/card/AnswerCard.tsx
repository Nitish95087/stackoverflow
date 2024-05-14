import React from "react";
import Metrix from "../shared/Metrix";
import { formatNumber, getTimeAgo } from "@/lib/action/utils";
import Link from "next/link";
import EditDeletePost from "../shared/EditDeletePost";

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
  userId: string | null;
  answerId: string;
}

const AnswerCard = ({
  _id,
  title,
  author,
  upvotes,
  createdAt,
  userId,
  answerId,
}: AnswerCardProps) => {
  return (
    <div className="background-light900_dark200 flex flex-col gap-3 rounded-xl px-5 py-4 md:px-10 md:py-9">
      <div className="flex items-start justify-between">
        <Link href={`/question/${_id}`} className={`w-4/5 `}>
          <h2 className="sm:h3-semibold base-semibold text-dark200_light900  flex-1">
            {title}
          </h2>
        </Link>

        {userId && <EditDeletePost id={answerId} type="Answer" />}
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
