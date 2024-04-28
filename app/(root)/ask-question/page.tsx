import React from "react";
// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
import Question from "@/components/form/Question";
import { getUserById } from "@/lib/action/user.action";

const AskQuestion = async () => {
  // const { userId } = auth();

  // if (!userId) redirect("/sign-in");

  // console.log(userId);

  const userId = "clerk001";

  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a Question</h1>

      <div className="mt-9">
        <Question author={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
