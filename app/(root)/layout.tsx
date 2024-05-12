import Navbar from "@/components/shared/navbar/Navbar";
import LeftSideBar from "@/components/shared/sidebar/LeftSideBar";
import RightSideBar from "@/components/shared/sidebar/RightSideBar";
import { auth } from "@clerk/nextjs";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  return (
    <main className="background-light850_dark100 relative">
      <Navbar />

      <div className="flex">
        <LeftSideBar userId={userId} />
        <section className="min-h-screen w-full flex-1 px-6 pb-6 pt-36 max-md:mb-14 sm:px-14">
          <div className="w-full md:mx-auto md:max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default Layout;
