import AllAnswers from "@/components/shared/AllAnswers";
import Answer from "@/components/shared/Answer";
import Metrix from "@/components/shared/Metrix";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import Votes from "@/components/shared/Votes";
import { getQuestionDetail } from "@/lib/action/question.action";
import { getUserById } from "@/lib/action/user.action";
import { formatNumber, getTimeAgo } from "@/lib/action/utils";
import { auth } from "@clerk/nextjs";
import React from "react";

const QuestoinDetail = async ({ params }: { params: any }) => {
  const questionId = params.questionId;

  const questionDetail = await getQuestionDetail({ _id: questionId });

  const author = questionDetail.author;
  const { userId } = auth();

  let mongoUser;

  if (userId) {
    mongoUser = await getUserById({ userId });
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col-reverse items-start gap-3 xs:flex-row xs:items-center xs:justify-between">
          <Metrix
            imgUrl={author.picture}
            alt={author.name}
            title={author.name}
            value={""}
            isAuthor={true}
            textStyles="text-dark400_light800 paragraph-semibold"
            href={author.clerkId}
          />

          <Votes
            type="Question"
            id={JSON.stringify(questionDetail._id)}
            userId={JSON.stringify(mongoUser?._id)}
            upvotes={questionDetail.upvotes.length}
            downvotes={questionDetail.downvotes.length}
            hasUpVoted={questionDetail.upvotes.includes(mongoUser?._id)}
            hasDownVoted={questionDetail.downvotes.includes(mongoUser?._id)}
            hasSaved={author.saved.includes(questionDetail._id)}
          />
        </div>

        <h2 className="h2-semibold text-dark200_light900 w-full text-left">
          {questionDetail.title}
        </h2>

        <div className="flex items-center justify-start gap-5">
          <Metrix
            imgUrl="/assets/icons/clock.svg"
            alt="time"
            value={getTimeAgo(questionDetail.createdAt)}
            title=""
            isAuthor={false}
            textStyles="small-medium text-dark400_light700"
          />
          <Metrix
            imgUrl="/assets/icons/message.svg"
            alt="message"
            value={formatNumber(questionDetail.answers.length)}
            title="Answer"
            isAuthor={false}
            textStyles="small-medium text-dark400_light700"
          />
          <Metrix
            imgUrl="/assets/icons/eye.svg"
            alt="views"
            value={formatNumber(questionDetail.views)}
            title="Views"
            isAuthor={false}
            textStyles="small-medium text-dark400_light700"
          />
        </div>

        <ParseHTML result={questionDetail.content} />

        {questionDetail.tags.length > 0 && (
          <div className="flex items-center justify-start gap-3">
            {questionDetail.tags.map((tag: any) => (
              <RenderTag key={tag._id} tag={tag.name} />
            ))}
          </div>
        )}
      </div>

      <AllAnswers
        questionId={JSON.stringify(questionDetail._id)}
        userId={mongoUser?._id}
      />

      <hr className="border border-gray-700" />

      <Answer
        questionId={JSON.stringify(questionDetail._id)}
        authorId={JSON.stringify(author._id)}
      />
    </div>
  );
};

export default QuestoinDetail;
