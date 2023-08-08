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
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
export default function CreateCourseButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  async function addCourse() {
    try {
      const { data } = await axios.post(
        "https://classechoapi.onrender.com/api/course/addcourse",
        {
          name,
          description,
          id: id.toString(),
        }
      );
      router.refresh();
    } catch (error) {}
  }
  return (
    <Dialog>
      <DialogTrigger className={cn(className)}>Create course</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Course</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <Input
            id="name"
            value={name}
            placeholder="Course name"
            className="col-span-4"
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            placeholder="Course description"
            id="username"
            value={description}
            className="col-span-4"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button type="submit" onClick={addCourse}>
              Save changes
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
