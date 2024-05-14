import Question from "@/components/form/Question";
import { getQuestionById } from "@/lib/action/question.action";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const mongoUser = params.id;
  const questionDetail = await getQuestionById({ id: mongoUser });

  const tagsArray = questionDetail.tags.map((item: any) => item.name);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <Question
          type="Edit"
          author={JSON.stringify(mongoUser._id)}
          title={questionDetail.title}
          explanation={questionDetail.content}
          tags={tagsArray}
          questionId={mongoUser}
        />
      </div>
    </div>
  );
};

export default page;
