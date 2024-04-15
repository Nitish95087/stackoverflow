import Navbar from "@/components/shared/navbar/Navbar";
import LeftSideBar from "@/components/shared/sidebar/LeftSideBar";
import RightSideBar from "@/components/shared/sidebar/RightSideBar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main>
      <Navbar />

      <div className="flex">
        <LeftSideBar />
        <section className="flex min-h-screen flex-1 px-6 pb-6 pt-36 max-md:mb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSideBar />
      </div>
    </main>
  );
};

export default Layout;