"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@radix-ui/react-icons";
export default function AddCourse({ id }: { id: string }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();
  async function addCourse() {
    const { data } = await axios.post(
      "https://classechoapi.onrender.com/api/addcourse",
      {
        name,
        description,
        id,
      }
    );
    router.refresh();
  }
  async function joinCourse() {
    const { data } = await axios.post(
      "https://classechoapi.onrender.com/api/joinCourse",
      {
        code,
        id,
      }
    );
    router.refresh();
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PlusIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger
              className={
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
              }
            >
              Create Class
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Class</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="name"
                    value={name}
                    placeholder="Course name"
                    className="col-span-3"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Textarea
                    placeholder="Course description"
                    id="username"
                    value={description}
                    className="col-span-3"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button type="submit" onClick={() => addCourse()}>
                    Save changes
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Dialog>
            <DialogTrigger
              className={
                "relative flex cursor-default select-none dark:hover:bg-slate-800 dark:hover:text-slate-50 w-full hover:bg-slate-100 hover:text-slate-900  items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
              }
            >
              Join Class
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Class</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <Input
                id="name"
                value={code}
                placeholder="Course code"
                className="col-span-3"
                onPaste={(event) => {
                  event.preventDefault();
                  const pastedData = event.clipboardData.getData("text/plain");
                  setCode(pastedData);
                }}
                onChange={(e) => setCode(e.target.value)}
              />
              <DialogFooter>
                <DialogTrigger asChild>
                  <Button type="submit" onClick={() => joinCourse()}>
                    Save changes
                  </Button>
                </DialogTrigger>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
