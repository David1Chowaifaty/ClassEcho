"use client";
import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button, buttonVariants } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
interface AddMaterialProps {
  course_id: string;
}
export default function AddMaterial({ course_id }: AddMaterialProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();
  async function handleAddMaterial() {
    const { data } = await axios.post("http://localhost:5080/api/addMaterial", {
      course_id,
      title,
      description,
    });
    setTitle("");
    setDescription("");
    router.refresh();
  }
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        <PlusIcon />
        Create Material
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Your Material</DialogTitle>
        </DialogHeader>
        <DialogDescription className="gap-4 flex-col flex">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
          <Textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogDescription>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button onClick={() => handleAddMaterial()}>Add</Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
