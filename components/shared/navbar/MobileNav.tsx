"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { mobileNavs } from "@/constants";
import { usePathname } from "next/navigation";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-4 pt-16">
      {mobileNavs.map((nav) => {
        const isActive =
          (pathname.includes(nav.route) && nav.route.length > 1) ||
          pathname === nav.route;

        return (
          <SheetClose asChild key={nav.route}>
            <Link
              href={nav.route}
              className={` flex min-h-[56px] w-full items-center justify-start gap-4 p-4 ${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light700"}`}
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
          </SheetClose>
        );
      })}
    </section>
  );
};

const MobileNav = () => {
  return (
    <div className="sm:hidden ">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src={"/assets/icons/hamburger.svg"}
            alt="menu"
            width={36}
            height={36}
            className="invert-color"
          />
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="background-light900_dark200 border-none"
        >
          <Link href={"/"} className="flex gap-1">
            <Image
              src={"/assets/images/site-logo.svg"}
              alt="logo"
              width={20}
              height={20}
            />
            <p className="h2-bold text-dark300_light700 font-spaceGrotesk ">
              Stack<span className="text-primary-500">Overflow</span>
            </p>
          </Link>

          <div className="overflow-y-auto">
            <SheetClose asChild className="">
              <NavContent />
            </SheetClose>

            <SignedOut>
              <div className="mt-10 flex flex-col gap-3">
                <SheetClose asChild>
                  <Link href={"/sign-in"}>
                    <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
                      <span className="primary-text-gradient">Log In</span>
                    </Button>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href={"/sign-up"}>
                    <Button className="small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                      <span className="primary-text-gradient">Sign Up</span>
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SignedOut>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
