import React from "react";
import { buttonVariants } from "./ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BackButton({
  classname,
  title,
}: {
  title: string;
  classname?: string;
}) {
  return (
    <div className={cn(classname, "flex items-center gap-5")}>
      <Link href="/" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeftIcon />
      </Link>
      <p>{title}</p>
    </div>
  );
}
