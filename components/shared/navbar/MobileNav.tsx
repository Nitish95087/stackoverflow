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

const NavContent = ({ userId }: { userId: string | null }) => {
  const pathname = usePathname();
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <section className="flex h-full flex-col justify-between gap-5">
      <div className="flex h-full flex-col gap-4 pt-16">
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
      </div>
      <SignedIn>
        <div className="flex flex-col gap-3">
          <SheetClose asChild>
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
                <p className={`primary-text-gradient ml-2`}>Profile</p>
              </Button>
            </Link>
          </SheetClose>

          <AlertDialog>
            <AlertDialogTrigger className="btn-secondary flex items-center justify-center gap-2 rounded-lg px-4 py-2">
              <Image
                src="/assets/icons/logout.svg"
                alt="logout"
                width={20}
                height={20}
                className={"invert-0 dark:invert"}
              />
              <p className={`primary-text-gradient ml-2`}>Logout</p>
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
    </section>
  );
};

const MobileNav = ({ userId }: { userId: string | null }) => {
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
              <NavContent userId={userId} />
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
