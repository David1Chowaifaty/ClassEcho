import { Course } from "@prisma/client";
import { ArrowRightIcon, ClockIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
interface LinkProps extends Course {}
export function ResultLink({ course_id, course_name }: LinkProps) {
  return (
    <Link
      href={`/course/${course_id}`}
      className="py-1.5 px-3 flex items-center text-sm rounded-md hover:bg-gray-100 dark:hover:bg-slate-900 w-full"
    >
      <p className="flex-1">{course_name}</p>
      <ArrowRightIcon />
    </Link>
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
