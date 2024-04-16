"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { mobileNavs } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-4">
      {mobileNavs.map((nav) => {
        const isActive =
          (pathname.includes(nav.route) && nav.route.length > 1) ||
          pathname === nav.route;

        return (
          <Link
            href={nav.route}
            className={` flex min-h-[56px] w-full items-center justify-start gap-4 px-4 py-3 ${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light700"}`}
            key={nav.route}
          >
            <Image
              src={nav.imgUrl}
              alt={nav.title}
              width={20}
              height={20}
              className={`${!isActive && "invert-color"}`}
            />
            <p className={`${isActive ? "base-bold" : "base-medium"}`}>
              {nav.title}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

const LeftSideBar = () => {
  return (
    <div className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0  flex h-screen w-fit flex-col justify-between   border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <NavContent />
      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href={"/sign-in"}>
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
              <span className="primary-text-gradient">Log In</span>
            </Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button className="small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <span className="primary-text-gradient">Sign Up</span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default LeftSideBar;
