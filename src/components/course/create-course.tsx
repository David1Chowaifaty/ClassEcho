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
import { Input } from "../ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { z } from "zod";
export default function CreateCourseButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const router = useRouter();
  async function addCourse() {
    try {
      const scheme = z.object({
        id: z.coerce.number(),
        name: z.string(),
        description: z.string(),
        tag: z.string(),
      });
      const payload = { name, description, id, tag };
      scheme.parse(payload);
      const { data } = await axios.post("/api/course/addCourse", payload);
      console.log(data);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
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
          <Input
            id="tag"
            value={tag}
            placeholder="Course tag"
            className="col-span-4"
            onChange={(e) => setTag(e.target.value)}
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
          <DialogTrigger asChild className="mb-4 sm:mt-0">
            <Button
              type="reset"
              variant={"secondary"}
              onClick={() => {
                setDescription("");
                setName("");
                setTag("");
              }}
            >
              Discard
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
