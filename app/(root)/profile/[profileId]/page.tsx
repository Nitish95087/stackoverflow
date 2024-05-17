import BadgeStat from "@/components/shared/BadgeStat";
import Tab from "@/components/shared/Tab";
import TopTag from "@/components/shared/TopTag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/lib/action/user.action";
import { formatJoinedDate } from "@/lib/action/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async ({ params }: { params: any }) => {
  const { user, totalQuestions, totalAnswers, badgeCount, reputation } =
    await getUserInfo({ userId: params.profileId });

  const { userId } = auth();
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-5 md:flex-row">
        <div className="flex w-full items-start justify-between md:w-auto">
          <Avatar className="size-28">
            <AvatarImage src={user?.picture} />
            <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>

          {userId === params.profileId && (
            <Link href={"/profile/edit"}>
              <Button className="md:hidden">Edit Profile</Button>
            </Link>
          )}
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="h2-bold text-dark100_light900">{user?.name}</h2>
              <p className="paragraph-regular text-dark200_light800">
                @{user?.username}
              </p>
            </div>
            {userId === params.profileId && (
              <Link href={"/profile/edit"}>
                <Button className="hidden md:block">Edit Profile</Button>
              </Link>
            )}
          </div>

          <div className="flex flex-1 flex-wrap items-center justify-start gap-3">
            {user?.portfolioLink && (
              <div className="paragraph-medium flex items-center justify-center gap-1 text-accent-blue">
                <Image
                  src="/assets/icons/link.svg"
                  alt="link"
                  width={20}
                  height={20}
                />
                <Link href={user.portfolioLink} target="_blank">
                  Portfolio
                </Link>
              </div>
            )}
            {user?.location && (
              <div className="paragraph-medium text-dark400_light700 flex items-center justify-center gap-1">
                <Image
                  src="/assets/icons/location.svg"
                  alt="link"
                  width={20}
                  height={20}
                />
                <span>{user.location}</span>
              </div>
            )}
            {user?.joinedAt && (
              <div className="paragraph-medium text-dark400_light700 flex items-center justify-center gap-1">
                <Image
                  src="/assets/icons/calendar.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                />
                <span>{formatJoinedDate(user.joinedAt)}</span>
              </div>
            )}
          </div>

          {user?.bio && (
            <p className="paragraph-regular text-dark400_light800">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      <div className="">
        <h3 className="h3-semibold text-dark200_light900">
          Stats - {reputation}
        </h3>
        <div className="mt-5 grid grid-cols-1 gap-3 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <div className="light-border background-light900_dark300 flex  w-full flex-1  items-center justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
            <p className="body-medium text-dark400_light700">
              {totalQuestions} Questions
            </p>
            <p className="body-medium text-dark400_light700">
              {totalAnswers} Answers
            </p>
          </div>
          <BadgeStat
            imgUrl="/assets/icons/gold-medal.svg"
            value={badgeCount?.GOLD}
            name="Gold"
          />
          <BadgeStat
            imgUrl="/assets/icons/silver-medal.svg"
            value={badgeCount?.SILVER}
            name="Silver"
          />
          <BadgeStat
            imgUrl="/assets/icons/bronze-medal.svg"
            value={badgeCount?.BRONZE}
            name="Bronze"
          />
        </div>
      </div>

      <div className="flex w-full items-start justify-between">
        <div className="w-full xl:w-[70%]">
          <Tab authorId={user._id} isAuthor={userId === user.clerkId} />
        </div>
        <div className="hidden xl:ml-5 xl:block xl:w-[30%]">
          <TopTag />
        </div>
      </div>
    </div>
  );
};

export default page;
