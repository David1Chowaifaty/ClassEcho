"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
export default function JoinCourse({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [code, setCode] = useState("");
  const router = useRouter();

  async function joinCourse() {
    const { data } = await axios.post(
      "https://classechoapi.onrender.com/api/course/joinCourse",
      {
        code,
        id,
      }
    );
    router.refresh();
  }
  return (
    <Dialog>
      <DialogTrigger className={cn(className)}>Join course</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Course</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Input
          id="name"
          value={code}
          placeholder="Course code"
          className=""
          onPaste={(event) => {
            event.preventDefault();
            const pastedData = event.clipboardData.getData("text/plain");
            setCode(pastedData);
          }}
          onChange={(e) => setCode(e.target.value)}
        />
        <DialogFooter>
          <DialogTrigger
            onClick={joinCourse}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Save changes
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
