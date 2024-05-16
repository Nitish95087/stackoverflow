import EditProfile from "@/components/shared/EditProfile";
import { getUserById } from "@/lib/action/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let mongoUser;

  if (userId) {
    mongoUser = await getUserById({ userId });
  }

  return (
    <div>
      <h2 className="h1-bold text-dark100_light900">Edit Profile</h2>
      <div className="mt-9">
        <EditProfile
          name={mongoUser.name}
          clerkId={JSON.stringify(mongoUser.clerkId)}
          username={mongoUser.username}
          portfolioLink={mongoUser.portfolioLink}
          location={mongoUser.location}
          bio={mongoUser.bio}
        />
      </div>
    </div>
  );
};

export default page;
