"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

function BackButton() {
  const router = useRouter();
  return (
    <div className=" pt-4">
      <Button onClick={() => router.back()}>
        {" "}
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>
    </div>
  );
}

export default BackButton;
