"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { mobileNavs } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
            className={` flex min-h-[56px] w-full items-center justify-start gap-4 px-4 py-3  ${isActive ? "primary-gradient rounded-lg text-light-900" : "text-dark300_light700"}`}
            key={nav.route}
          >
            <Image
              src={nav.imgUrl}
              alt={nav.title}
              width={20}
              height={20}
              className={`${!isActive && "invert-color"}`}
            />
            <p
              className={`${isActive ? "base-bold" : "base-medium"} max-md:hidden`}
            >
              {nav.title}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

const LeftSideBar = ({ userId }: { userId: string | null }) => {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0  flex h-screen w-fit flex-col justify-between   border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <NavContent />

      <SignedIn>
        <div className="flex flex-col gap-3">
          <Link href={`/profile/${userId}`}>
            <Button
              className={`small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3`}
            >
              <Image
                src="/assets/icons/avatar.svg"
                alt="user"
                width={25}
                height={25}
                className={"invert-color"}
              />
              <p className={`primary-text-gradient ml-2 max-md:hidden`}>
                Profile
              </p>
            </Button>
          </Link>

          <AlertDialog>
            <AlertDialogTrigger className="btn-secondary flex items-center justify-center gap-2 rounded-lg px-4 py-2">
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={20}
                height={20}
                className={"invert-0 dark:invert"}
              />
              <p className={`primary-text-gradient ml-2 max-md:hidden`}>
                Logout
              </p>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-dark200_light900">
                  Are you sure you want to log out?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Logging out will end your current session and require you to
                  sign in again to access your account
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-dark200_light900 background-light900_dark200">
                  No
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => signOut(() => router.push("/"))}
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SignedIn>

      <SignedOut>
        <div className="flex flex-col gap-3">
          <Link href={"/sign-in"}>
            <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3">
              <Image
                src={"/assets/icons/account.svg"}
                alt="login"
                width={20}
                height={20}
                className="md:hidden"
              />
              <span className="primary-text-gradient max-md:hidden">
                Log In
              </span>
            </Button>
          </Link>

          <Link href={"/sign-up"}>
            <Button className="small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
              <Image
                src={"/assets/icons/sign-up.svg"}
                alt="login"
                width={20}
                height={20}
                className="md:hidden"
              />
              <span className="primary-text-gradient max-md:hidden">
                Sign Up
              </span>
            </Button>
          </Link>
        </div>
      </SignedOut>
    </div>
  );
};

export default LeftSideBar;
