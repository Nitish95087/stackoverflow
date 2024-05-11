import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QuestionCard from "../card/QuestionCard";
import { topPosts } from "@/lib/action/question.action";
import { getTopUserAnswer } from "@/lib/action/answer.action";
import AnswerCard from "../card/AnswerCard";

const Tab = async ({ userId }: { userId: string }) => {
  const topPost = await topPosts({ authorId: JSON.parse(userId) });
  const topAnswer = await getTopUserAnswer({ userId: JSON.parse(userId) });

  return (
    <Tabs defaultValue="top-posts">
      <TabsList>
        <TabsTrigger value="top-posts">Top Posts</TabsTrigger>
        <TabsTrigger value="answers">Answers</TabsTrigger>
      </TabsList>
      <TabsContent value="top-posts">
        {topPost.length > 0 && (
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
              />
            ))}
          </div>
        )}
      </TabsContent>
      <TabsContent value="answers">
        <div className="flex flex-col gap-4">
          {topAnswer.length > 0 &&
            topAnswer.map((answer) => (
              <AnswerCard
                key={answer._id}
                _id={answer.question._id}
                title={answer.question.title}
                author={answer.author}
                upvotes={answer.upvotes}
                createdAt={answer.createdAt}
              />
            ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Tab;
