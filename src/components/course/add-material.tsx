"use client";
import React, { useCallback, useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button, buttonVariants } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MultiUploader } from "../upload-image";
import { UploadFileResponse } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import toast from "react-hot-toast";

interface AddMaterialProps {
  course_id: string;
}
export default function AddMaterial({ course_id }: AddMaterialProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {},
    onUploadError: () => {
      alert("error occurred while uploading");
    },
  });
  const router = useRouter();
  async function handleAddMaterial() {
    let urls: UploadFileResponse[] | undefined;
    if (files) {
      urls = await startUpload(files);
    }
    if (urls) {
      toast.promise(
        axios.post("/api/material/addMaterial", {
          course_id,
          title,
          description,
          url: urls[0].url,
        }),
        {
          error: "Opps something went wrong!",
          loading: "Creating your Material.",
          success: "Material have been added successfully",
        },
        { position: "bottom-right" }
      );
    } else {
      toast.promise(
        axios.post("/api/material/addMaterial", {
          course_id,
          title,
          description,
        }),
        {
          error: "Opps something went wrong!",
          loading: "Creating your Material.",
          success: "Material have been added successfully",
        },
        { position: "bottom-right" }
      );
    }
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
        <DialogDescription>
          <div className="gap-4 max-h-[70vh] flex-col flex overflow-y-auto">
            <Input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="h-10"
            />
            <Textarea
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <p>Upload photos or documents here</p>

            <MultiUploader onDropImage={setFiles} />
          </div>
        </DialogDescription>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleAddMaterial()}
              type="button"
              variant={"secondary"}
            >
              Discard
            </Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            <Button onClick={() => handleAddMaterial()} type="button">
              Add
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
