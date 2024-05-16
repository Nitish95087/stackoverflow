import React from "react";
import { jobsCard } from "@/constants";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { UserFilters } from "@/constants/filters";
import Filter from "@/components/shared/Filter";
import JobCard from "@/components/card/JobCard";
import PaginationCard from "@/components/shared/PaginationCard";

const Jobs = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="flex flex-col gap-3">
      <h1 className="h2-bold sm:h1-bold text-dark100_light900">Jobs</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          placeholder="Job Title, Company or keywords"
          route="/jobs"
        />
        <Filter trigger="Select a Filter" content={UserFilters} />
      </div>

      <div className="my-5 flex flex-col gap-5">
        {jobsCard.map((item) => (
          <JobCard
            key={item._id}
            logoUrl={item.logoUrl}
            title={item.title}
            description={item.description}
            type={item.type}
            isOpen={item.isOpen}
            siteLink={item.siteLink}
            location={item.location}
          />
        ))}
      </div>

      <PaginationCard
        pageNumber={searchParams.page ? +searchParams.page : 1}
        isNext={false}
      />
    </div>
  );
};

export default Jobs;
