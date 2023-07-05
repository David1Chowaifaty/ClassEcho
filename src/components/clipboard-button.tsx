"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
export default function ClipboardButton({ code }: { code: string }) {
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{code}</TooltipTrigger>
          <TooltipContent>
            <p>Course code</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        variant={"ghost"}
        aria-label="copy-to-clipboard"
        className="h-fit w-fit p-2"
        onClick={() => {
          navigator.clipboard.writeText(code);
          toast.success("copied successfully", { position: "bottom-right" });
        }}
      >
        <CopyIcon />
      </Button>
    </>
  );
}
