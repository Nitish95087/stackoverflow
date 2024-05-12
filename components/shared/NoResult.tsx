import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  link?: string;
  linkTitle?: string;
}

const NoResult = ({ title, description, link, linkTitle }: Props) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={"/assets/images/light-illustration.png"}
        alt="not found"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src={"/assets/images/dark-illustration.png"}
        alt="not found"
        width={300}
        height={300}
        className="hidden dark:flex"
      />
      <h1 className="h2-semibold text-dark400_light800">{title}</h1>
      <p className="paragraph-regular text-dark400_light800 max-w-sm">
        {description}
      </p>
      {link && linkTitle && (
        <Link href={link}>
          <Button className="">{linkTitle}</Button>
        </Link>
      )}
    </div>
  );
};

export default NoResult;
