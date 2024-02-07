import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const DashboardPage = () => {
  return (
    <div className="relative">
      <div
        className="relative w-full"
        style={{
          height: "calc(100vh - 80px)",
          filter: "contrast(1.2)",
        }}
      >
        <Image
          fill
          src="/hero1.jpg"
          alt="hero"
          className="absolute top-0 object-cover"
          style={{
            filter: "contrast(.8) brightness(.9) grayscale(.5) saturate(1.2)",
            objectPosition: "20% 10%",
          }}
        />
      </div>
      {/* <video
        src="/video1.mp4"
        autoPlay
        loop
        muted
        className="w-full object-cover absolute top-0"
        style={{
          height: "calc(100vh - 80px)",
          filter: "contrast(1.1)",
        }}
      /> */}
      <div className="absolute text-white top-[20vh] right-[8vw] p-4">
        <div>
          <p className="text-5xl sm:text-7xl font-extrabold">Build with us!</p>
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
