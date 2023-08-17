"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DotsVerticalIcon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "react-hot-toast";
import CustomAlert from "../custom-alert";
import { Users } from "@prisma/client";
import Spinner from "../ui/spinner";
interface Student extends Users {
  enrollment_id: number;
}
export default function CourseOptions({
  admin,
  course_code,
  course_id,
  id,
}: {
  admin: boolean;
  course_code: string;
  course_id: string;
  id: string;
}) {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function getEnrolledStudents() {
    try {
      setIsLoading(true);
      setStudents([]);
      const { data } = await axios.get(`/api/students/${course_id}`);
      if (data) setStudents(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCourse() {
    toast
      .promise(
        axios.post(`/api/course/deleteCourse`, {
          course_id,
        }),
        {
          error: "Something went wrong",
          loading: "Loading",
          success: `This course have been removed successfully`,
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
      axios.post(`/api/students/removeStudent`, {
        enrollment_id,
      }),
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
        axios.post("/api/course/leaveCourse", {
          course_id,
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
        <p className="sr-only">options</p>
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
              <DialogDescription className="flex flex-col">
                {isLoading && <Spinner className="self-center" />}
                {(!students || students.length === 0) && !isLoading ? (
                  <p>No one enrolled in this course</p>
                ) : (
                  students &&
                  students.map((student) => {
                    if (student.id !== parseInt(id)) {
                      return (
                        <div
                          key={student.id}
                          className="py-3 w-full border-b flex items-center justify-between"
                        >
                          <p>{student.email}</p>
                          {admin && (
                            <CustomAlert
                              handleClick={() =>
                                deleteStudent(
                                  student.enrollment_id,
                                  student.email
                                )
                              }
                              triggerContent={
                                <TrashIcon className="text-red-900 dark:text-red-500" />
                              }
                              className="p-1.5 rounded-md hover:bg-slate-100/50 dark:hover:bg-slate-900"
                            />
                          )}
                        </div>
                      );
                    } else {
                      if (students.length === 1) {
                        return (
                          <p key={student.id}>No one enrolled in this course</p>
                        );
                      }
                    }
                  })
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>
        {admin ? (
          <DropdownMenuItem asChild>
            <CustomAlert
              handleClick={deleteCourse}
              className={
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
              }
              triggerContent={<>Delete Course</>}
            />
          </DropdownMenuItem>
        ) : (
          <CustomAlert
            handleClick={leaveCourse}
            className={
              "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
            }
            triggerContent={<>Leave Course</>}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
