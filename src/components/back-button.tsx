"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function BackButton({
  classname,
  title,
}: {
  title: string;
  classname?: string;
}) {
  const router = useRouter();
  return (
    <div className={cn(classname, "flex items-center gap-5")}>
      <Button variant={"ghost"} onClick={() => router.back()}>
        <ArrowLeftIcon />
      </Button>
      <p>{title}</p>
    </div>
  );
}
