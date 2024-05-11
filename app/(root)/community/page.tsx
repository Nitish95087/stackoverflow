import UserCard from "@/components/card/UserCard";
import Filter from "@/components/shared/Filter";
import PaginationCard from "@/components/shared/PaginationCard";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import { getAllUser } from "@/lib/action/user.action";
import React from "react";

const Community = async () => {
  const usersCard = await getAllUser();

  return (
    <div className="flex flex-col gap-3">
      <h1 className="h2-bold sm:h1-bold text-dark100_light900">Users</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch placeholder="Search amazing mind here..." />
        <Filter trigger="Select a Filter" content={UserFilters} />
      </div>

      <div className="my-5 grid w-full grid-cols-1 gap-5  sm:grid-cols-2 lg:grid-cols-3">
        {usersCard.map((item) => (
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

      <PaginationCard />
    </div>
  );
};

export default Community;
