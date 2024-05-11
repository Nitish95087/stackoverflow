import QuestionCard from "@/components/card/QuestionCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { getSpecificTag } from "@/lib/action/tag.action";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const tag = await getSpecificTag({ tagId: params.tagId });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="h1-bold text-dark100_light900 text-left">{tag.name}</h1>

      <LocalSearch placeholder="Search tag question..." />

      <div className="mt-4 flex flex-col gap-6">
        {tag.questions.map((question: any) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
            clerkId={tag.clerkId}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
