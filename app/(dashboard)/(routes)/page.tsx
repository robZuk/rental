import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return (
    <div className="relative">
      <video
        src="/video.mp4"
        autoPlay
        loop
        muted
        className="w-full object-cover absolute top-0"
        style={{
          height: "calc(100vh - 80px)",
          filter: "contrast(1.1)",
        }}
      />
      <div className="absolute text-white top-[20vh] sm:left-[8%] left-[5%]">
        <div>
          <p className="text-7xl font-extrabold">Build with us!</p>
          <p className="font-bold text-xl">
            Reserve our equipment to grow your buisness
          </p>
        </div>
        <Link href="/categories">
          <Button className=" font-semibold text-md mt-4 rounded-none px-6 tracking-wide hover:text-white">
            See more
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;
