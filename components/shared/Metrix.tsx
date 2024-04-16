import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
  dot?: boolean;
}

const Metrix = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  textStyles,
  isAuthor,
  dot,
}: MetricProps) => {
  const metricContent = (
    <>
      {!dot ? (
        <Image
          src={imgUrl}
          alt={alt}
          width={16}
          height={16}
          className={`rounded-[50%] object-contain`}
        />
      ) : (
        <span className="base-medium text-light400_light500 max-sm:hidden ">
          .
        </span>
      )}
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1  ${isAuthor ? "max-sm:hidden" : ""}`}
        >
          {title}
        </span>
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
