import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Question from "@/components/form/Question";
import { getUserById } from "@/lib/action/user.action";

const AskQuestion = () => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = getUserById({ userId });

  console.log(mongoUser);

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>

      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default AskQuestion;
