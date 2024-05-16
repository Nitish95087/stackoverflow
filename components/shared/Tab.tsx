import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "../card/QuestionCard";
import { topPosts } from "@/lib/action/question.action";
import { getTopUserAnswer } from "@/lib/action/answer.action";
import AnswerCard from "../card/AnswerCard";
import NoResult from "./NoResult";
import { auth } from "@clerk/nextjs";

const Tab = async ({
  authorId,
  isAuthor,
}: {
  authorId: string;
  isAuthor: boolean;
}) => {
  const topPost = await topPosts({ authorId });
  const topAnswer = await getTopUserAnswer({ userId: authorId });
  const { userId } = auth();

  return (
    <Tabs defaultValue="top-posts">
      <TabsList>
        <TabsTrigger value="top-posts">Top Posts</TabsTrigger>
        <TabsTrigger value="answers">Answers</TabsTrigger>
      </TabsList>
      <TabsContent value="top-posts" className="mt-5">
        {topPost.length > 0 ? (
          <div className="flex flex-col gap-4">
            {topPost.map((item) => (
              <QuestionCard
                key={item._id}
                _id={item._id}
                title={item.title}
                tags={item.tags}
                author={item.author}
                upvotes={item.upvotes}
                views={item.views}
                answers={item.answers}
                createdAt={item.createdAt}
                isAuthor={isAuthor}
              />
            ))}
          </div>
        ) : (
          <div className="mt-4 flex w-full items-center justify-center">
            <NoResult
              title="There&rsquo;s no question to show"
              description="Be the first to break the silence 🚀 Ask a question and start discussion Our query could be next big thing other learn from Get Involve"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          </div>
        )}
      </TabsContent>
      <TabsContent value="answers">
        <div className="flex flex-col gap-4">
          {topAnswer.length > 0 ? (
            topAnswer.map((answer) => (
              <AnswerCard
                key={answer._id}
                _id={answer.question._id}
                title={answer.question.title}
                author={answer.author}
                upvotes={answer.upvotes}
                createdAt={answer.createdAt}
                userId={userId}
                answerId={JSON.stringify(answer._id)}
              />
            ))
          ) : (
            <div className="mt-4 flex w-full items-center justify-center">
              <NoResult
                title="There&rsquo;s no answer to show"
                description="Be the first to break the silence 🚀 Start helping and discussion Our query could be next big thing other learn from Get Involve"
              />
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Tab;
