"use client";
import React from "react";
import { Button } from "./ui/button";
import { ExitIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function SignOut() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            aria-label="signout"
            variant={"ghost"}
            size={"icon"}
            onClick={() => signOut()}
          >
            <ExitIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Sign out</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
