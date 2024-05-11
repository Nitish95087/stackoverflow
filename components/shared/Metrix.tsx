import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor: boolean;
}

const Metrix = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
}: MetricProps) => {
  const metricContent = (
    <>
      {isAuthor ? (
        <Avatar className="size-7">
          <AvatarImage src={imgUrl} />
          <AvatarFallback>{alt.slice(0, 2)}</AvatarFallback>
        </Avatar>
      ) : (
        <Image src={imgUrl} alt={alt} width={20} height={20} />
      )}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span className={` line-clamp-1`}>{title}</span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }

  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metrix;
