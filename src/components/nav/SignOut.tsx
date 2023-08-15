"use client";
import React from "react";
import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function SignOut({ className }: { className?: string }) {
  return (
    <Button
      aria-label="signout"
      variant={"ghost"}
      className={cn(className, "gap-5")}
      onClick={() => signOut()}
    >
      <p className="lg:sr-only">LogOut</p>
      <ExitIcon />
    </Button>
  );
}
