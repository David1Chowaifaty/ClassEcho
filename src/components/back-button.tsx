"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function BackButton() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-5">
      <Button variant={"ghost"} onClick={() => router.back()}>
        <ArrowLeftIcon />
      </Button>
      <p>Courses</p>
    </div>
  );
}
