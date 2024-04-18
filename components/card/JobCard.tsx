import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  _id?: number;
  logoUrl?: string;
  title: string;
  description: string;
  type: string;
  isOpen: boolean;
  siteLink: string;
  location?: {
    imgUrl: string;
    address: string;
  };
}

const JobCard = ({
  _id,
  logoUrl,
  title,
  description,
  type,
  isOpen,
  siteLink,
  location,
}: Props) => {
  return (
    <div className="background-light900_dark200 flex w-full  flex-col rounded-xl p-4 sm:flex-row">
      <div className="flex items-center justify-between p-3">
        <Image
          src={"/assets/images/site-logo.svg"}
          alt={title}
          width={50}
          height={50}
        />

        <Button className="background-light800_dark400 flex cursor-default gap-1  sm:hidden">
          <Image
            src={location?.imgUrl || "/assets/images/site-logo.svg"}
            alt="address"
            width={20}
            height={20}
          />
          <p className="text-dark400_light700 small-regular">
            {location?.address}
          </p>
        </Button>
      </div>
      <div className="flex flex-col  justify-between gap-1">
        <div className="flex items-center justify-between">
          <h1 className="base-semibold text-dark200_light900">{title}</h1>
          <Button className="background-light800_dark400 flex cursor-default gap-1 max-sm:hidden">
            <Image
              src={location?.imgUrl || "/assets/images/site-logo.svg"}
              alt="address"
              width={20}
              height={20}
            />
            <p className="text-dark400_light700 body-medium">
              {location?.address}
            </p>
          </Button>
        </div>

        <p className="body-regular text-dark400_light700 line-clamp-2 sm:max-w-[60%]">
          {description}
        </p>

        <div className="mt-4 flex flex-col items-center  justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2 sm:gap-5">
            <div className="flex items-center gap-1">
              <Image
                src={"/assets/icons/clock-2.svg"}
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">{type.toUpperCase()}</p>
            </div>
            <div className="flex items-center gap-1">
              <Image
                src={"/assets/icons/currency-dollar-circle.svg"}
                alt="clock"
                width={20}
                height={20}
              />
              <p className="body-medium text-light-500">
                {isOpen ? "Not Disclosed" : "Disclosed"}
              </p>
            </div>
          </div>
          <Link
            href={siteLink}
            className="flex items-center gap-1 text-primary-500"
          >
            <p className="body-semibold primary-text-gradient">View Job</p>
            <Image
              src={"/assets/icons/arrow-up-right.svg"}
              alt="view job"
              width={20}
              height={20}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
