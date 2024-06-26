"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { downvoteQuestion, upvoteQuestion } from "@/lib/action/question.action";
import { usePathname, useRouter } from "next/navigation";
import { toggleSave } from "@/lib/action/user.action";
import { downvoteAnswer, upvoteAnswer } from "@/lib/action/answer.action";
import { viewQuestion } from "@/lib/action/interaction.action";
import { useToast } from "../ui/use-toast";

interface VotesProps {
  type: string;
  id: string;
  userId: string | undefined;
  upvotes: number;
  downvotes: number;
  hasUpVoted: boolean;
  hasDownVoted: boolean;
  hasSaved: boolean;
}

const Votes = ({
  type,
  id,
  userId,
  upvotes,
  downvotes,
  hasUpVoted,
  hasDownVoted,
  hasSaved,
}: VotesProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleSave = async () => {
    if (!userId) {
      return toast({
        title: "Please Log In",
        description: "You must be loged in to perform this action",
      });
    }

    await toggleSave({
      id: JSON.parse(id),
      userId: JSON.parse(userId),
      hasSaved,
      path: pathname,
    });

    toast({
      title: `Saved ${!hasSaved ? "Successfull" : "Removed"}`,
      variant: !hasSaved ? "default" : "destructive",
    });
  };

  const handleVote = async (action: string) => {
    if (!userId) {
      return toast({
        title: "Please Log In",
        description: "You must be loged in to perform this action",
      });
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          id: JSON.parse(id),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await upvoteAnswer({
          id: JSON.parse(id),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }

      toast({
        title: `Upvoted ${!hasUpVoted ? "Successfull" : "Removed"}`,
        variant: !hasUpVoted ? "default" : "destructive",
      });
    } else if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          id: JSON.parse(id),
          userId: JSON.parse(userId),
          hasDownVoted,
          hasUpVoted,
          path: pathname,
        });
      } else if (type === "Answer") {
        await downvoteAnswer({
          id: JSON.parse(id),
          userId: JSON.parse(userId),
          hasUpVoted,
          hasDownVoted,
          path: pathname,
        });
      }

      toast({
        title: `Downvoted ${!hasDownVoted ? "Successfull" : "Removed"}`,
        variant: !hasDownVoted ? "default" : "destructive",
      });
    }
  };

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(id),
      userId: userId ? JSON.parse(userId) : undefined,
    });
  }, [id, userId, pathname, router]);

  return (
    <div className="flex gap-2">
      <div className="flex gap-1.5">
        <Image
          src={
            hasUpVoted
              ? "/assets/icons/upvoted.svg"
              : "/assets/icons/upvote.svg"
          }
          alt="upvote"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            handleVote("upvote");
          }}
        />
        <Badge className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-0 outline-none">
          {upvotes}
        </Badge>
      </div>
      <div className="flex gap-1.5">
        <Image
          src={
            hasDownVoted
              ? "/assets/icons/downvoted.svg"
              : "/assets/icons/downvote.svg"
          }
          alt="upvote"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            handleVote("downvote");
          }}
        />
        <Badge className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-0 outline-none">
          {downvotes}
        </Badge>
      </div>

      {type === "Question" && (
        <Image
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="upvote"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => {
            handleSave();
          }}
        />
      )}
    </div>
  );
};

export default Votes;
