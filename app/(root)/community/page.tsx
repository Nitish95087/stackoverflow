import UserCard from "@/components/card/UserCard";
import Filter from "@/components/shared/Filter";
import NoResult from "@/components/shared/NoResult";
import PaginationCard from "@/components/shared/PaginationCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUser } from "@/lib/action/user.action";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Commnunity",
  description:
    "StackOverflow is a community of 1, 32342332+ developers. Join us.",
};

const Community = async ({ searchParams }: { searchParams: any }) => {
  const usersCard = await getAllUser({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page,
  });

  return (
    <div className="flex flex-col gap-3">
      <h1 className="h2-bold sm:h1-bold text-dark100_light900">Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          placeholder="Search amazing mind here..."
          route="/community"
        />
        <Filter trigger="Select a Filter" content={UserFilters} />
      </div>

      {usersCard.users.length > 0 ? (
        <div className="my-5 grid w-full grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-3">
          {usersCard.users.map((item) => (
            <UserCard
              key={item._id}
              _id={item._id}
              clerkId={item.clerkId}
              name={item.name}
              username={item.username}
              picture={item.picture}
            />
          ))}
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <NoResult
            title="There&rsquo;s no user to show"
            description="Be the first to break the silence 🚀 Ask a question and start discussion Our query could be next big thing other learn from Get Involve"
          />
        </div>
      )}

      <PaginationCard
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={usersCard.isNext}
      />
    </div>
  );
};

export default Community;
