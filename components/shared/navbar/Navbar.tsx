import Image from "next/image";
import Link from "next/link";
import React from "react";
import GlobalSearch from "../search/GlobalSearch";
import ToggleTheme from "../ToggleTheme";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="background-light900_dark200 flex-between fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 ">
      <Link href={"/"} className="flex gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          alt="Logo"
          width={23}
          height={23}
        />
        <p className="h2-bold font-spaceGrotesk text-dark-300 dark:text-light-800 max-sm:hidden">
          Stack<span className="text-primary-500">Overflow</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-3">
        <ToggleTheme />

        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>

        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
