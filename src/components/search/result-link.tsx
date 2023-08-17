"use client";
import { Course } from "@prisma/client";
import { ArrowRightIcon, ClockIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React, { useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import axios from "axios";
import { enrolledStudent } from "./search-bar";
import { useRouter } from "next/navigation";

interface LinkProps extends Course {
  enrolledStudents: enrolledStudent[];
  id: number;
}
export function ResultLink({
  course_id,
  course_name,
  description,
  enrolledStudents,
  course_code,
  id,
}: LinkProps) {
  const router = useRouter();
  const joinCourse = useCallback(async () => {
    try {
      await axios.post("/api/course/joinCourse", { id, course_code });
    } catch (error) {
      console.log(error);
    } finally {
      router.refresh();
    }
  }, [course_code, id, router]);
  return (
    <Dialog>
      <DialogTrigger className="py-1.5 px-3 flex items-center justify-between text-sm rounded-md hover:bg-gray-100 dark:hover:bg-slate-900 w-full">
        {course_name}
        <ArrowRightIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{course_name}</DialogTitle>
        <section>
          <h2 className="text-sm font-medium mb-6 text-gray-600 dark:text-gray-100">
            {enrolledStudents.length > 0 ? enrolledStudents.length : "No"}{" "}
            Students Enrolled
          </h2>
          <p className="text-sm mb-5 font-normal text-gray-500 dark:text-gray-300">
            {description}
          </p>
        </section>
        <DialogFooter>
          <DialogTrigger>
            {enrolledStudents.find((student) => student.student_id === id) ? (
              <Link
                href={`/course/${course_id}`}
                className={buttonVariants({ variant: "default" })}
              >
                View Course
              </Link>
            ) : (
              <Button onClick={joinCourse}>Join now</Button>
            )}
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function RecentSearchLink({ course_id, course_name }: LinkProps) {
  return (
    <Link
      href={`/course/${course_id}`}
      className="flex items-center w-full text-gray-400 border-b border-gray-100 dark:border-slate-900 text-sm dark:text-gray-300 gap-4 px-4 hover:rounded-md py-2 hover:bg-slate-100 dark:hover:bg-slate-900"
    >
      <ClockIcon />
      <p className="flex-1">{course_name}</p>
      <ArrowRightIcon />
    </Link>
  );
}
