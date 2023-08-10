"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
export default function ClipboardButton({ code }: { code: string }) {
  return (
    <>
      <p>{code}</p>
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
