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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
type student = {
  email: string;
  profile: string | null;
  enrollment_id: number;
};
export default function CourseOptions({
  admin,
  course_code,
  id,
}: {
  admin: boolean;
  course_code: string;
  id: string;
}) {
  const router = useRouter();
  const [students, setStudents] = useState<student[]>();
  const [open, setOpen] = useState(false);
  async function getEnrolledStudents() {
    const url = `https://classechoapi.onrender.com/api/getEnrolledStudents/${course_code}`;
    const { data } = await axios.get(url);
    setStudents(data);
  }
  async function deleteCourse() {
    toast
      .promise(
        axios.post("https://classechoapi.onrender.com/api/deleteCourse", {
          course_code,
        }),
        {
          error: "Something went wrong",
          loading: "Loading",
          success: `This course have been removed from your course`,
        },
        { position: "bottom-right" }
      )
      .then(() => {
        router.replace("/");
      });
  }
  async function deleteStudent(enrollment_id: number, email: string) {
    setOpen(false);
    toast.promise(
      axios.post(
        "https://classechoapi.onrender.com/api/removeEnrolledStudent",
        {
          enrollment_id,
        }
      ),
      {
        error: "Something went wrong",
        loading: "Loading",
        success: `${email} have been removed from your course`,
      },
      { position: "bottom-right" }
    );
  }
  async function leaveCourse() {
    toast
      .promise(
        axios.post("https://classechoapi.onrender.com/api/leaveCourse", {
          id,
        }),
        {
          error: "Something went wrong",
          loading: "Loading",
          success: `you have left this course successfully`,
        },
        { position: "bottom-right" }
      )
      .then(() => {
        router.replace("/");
      });
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Dialog onOpenChange={setOpen} open={open}>
            <DialogTrigger
              className={
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
              }
              onClick={getEnrolledStudents}
            >
              View Students
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogTitle>Enrolled Students</DialogTitle>
              <DialogDescription>
                {!students ? (
                  <p>No one enrolled in this course</p>
                ) : (
                  students.map((student) => (
                    <div
                      key={student.enrollment_id}
                      className="py-3 w-full border-b flex items-center justify-between"
                    >
                      <p>{student.email}</p>
                      <AlertDialog>
                        <AlertDialogTrigger className="p-1.5 rounded-md hover:bg-slate-100/50 dark:hover:bg-slate-900">
                          <TrashIcon className="text-red-900 dark:text-red-500" />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className={buttonVariants({
                                variant: "destructive",
                              })}
                              onClick={() =>
                                deleteStudent(
                                  student.enrollment_id,
                                  student.email
                                )
                              }
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  ))
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        {admin ? (
          <DropdownMenuItem asChild>
            <AlertDialog>
              <AlertDialogTrigger
                className={
                  "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
                }
              >
                Delete Course
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className={buttonVariants({ variant: "destructive" })}
                    onClick={deleteCourse}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuItem>
        ) : (
          <AlertDialog>
            <AlertDialogTrigger
              className={
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
              }
            >
              Leave Course
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className={buttonVariants({
                    variant: "destructive",
                  })}
                  onClick={leaveCourse}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
