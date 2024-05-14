import React from "react";
import Metrix from "./Metrix";
import { getAnswer } from "@/lib/action/answer.action";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import Votes from "./Votes";
import ParseHTML from "./ParseHTML";

interface AllAnswerProps {
  questionId: string;
  userId: string | undefined;
}

const AllAnswers = async (params: AllAnswerProps) => {
  const { questionId, userId } = params;

  const answers = await getAnswer({ questionId });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="primary-text-gradient">
          {answers.length > 1
            ? `${answers.length} Answers`
            : `${answers.length} Answer`}
        </p>
        <Filter trigger="Select a Filter" content={AnswerFilters} />
      </div>

      <div className="flex flex-col gap-5">
        {answers.map((answer) => (
          <div key={answer._id} className="">
            <div className="flex items-center justify-between">
              <Metrix
                imgUrl={answer.author.picture}
                alt={answer.author.name}
                value={answer.author.name}
                title=""
                isAuthor={true}
                textStyles="text-dark200_light900"
              />

              <Votes
                type="Answer"
                id={JSON.stringify(answer._id)}
                userId={JSON.stringify(userId)}
                upvotes={answer.upvotes.length}
                downvotes={answer.downvotes.length}
                hasUpVoted={answer.upvotes.includes(userId)}
                hasDownVoted={answer.downvotes.includes(userId)}
                hasSaved={false}
              />
            </div>

            <ParseHTML result={answer.answerContent} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllAnswers;
