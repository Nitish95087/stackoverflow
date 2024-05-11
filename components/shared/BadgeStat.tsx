import Image from "next/image";
import React from "react";

interface BadgeStatProps {
  imgUrl: string;
  value: number;
  name: string;
}

const BadgeStat = ({ imgUrl, value, name }: BadgeStatProps) => {
  return (
    <div className="light-border background-light900_dark300 flex min-h-[150px] flex-col items-start justify-center gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt={name} width={40} height={40} />
      <p className="body-medium text-dark400_light700">
        {value} {name} Badeges
      </p>
    </div>
  );
};

export default BadgeStat;
