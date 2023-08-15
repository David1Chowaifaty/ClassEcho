"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { avatarName, cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "next-auth";
import SignOut from "./nav/SignOut";
import { ModeToggle } from "./nav/theme-toggle";
import CreateCourseButton from "./course/create-course";
import JoinCourse from "./course/join-course";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
interface MenuProps extends User {
  id: string;
}
export default function Menu({ id, email, image, name }: MenuProps) {
  const { setTheme, systemTheme, theme } = useTheme();
  return (
    <Sheet>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      >
        <HamburgerMenuIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3 font-normal text-sm py-3 border-b dark:border-slate-800">
            <Avatar>
              <AvatarImage src={image!} />
              <AvatarFallback>
                <p>{avatarName(name!)}</p>
              </AvatarFallback>
            </Avatar>
            {email}
          </SheetTitle>
          <ul className="flex h-full flex-col justify-center w-full gap-4 lg:justify-end ">
            <li className="mt-4 text-lg w-full pt-2 text-start ">Course</li>
            <li
              className={
                "relative flex cursor-default select-none items-center px-2 rounded-sm  py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
              }
            >
              <CreateCourseButton
                id={id}
                className="w-full text-start dark:text-slate-300"
              />
            </li>
            <li
              className={
                "relative flex  cursor-default  items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:hover:bg-slate-800 dark:hover:text-slate-50  dark:focus:bg-slate-800 dark:focus:text-slate-50 w-full"
              }
            >
              <JoinCourse
                id={id}
                className="w-full text-start dark:text-slate-300"
              />
            </li>
            <li className="flex items-center w-full justify-between">
              Switch to{" "}
              {(theme === "system" && systemTheme === "dark") ||
              theme === "dark"
                ? "light"
                : "dark"}
              <Switch
                checked={
                  (theme === "system" && systemTheme === "dark") ||
                  theme === "dark"
                }
                onCheckedChange={(e) => setTheme(e ? "dark" : "light")}
              />
            </li>
            <li className="flex mt-10 items-center w-full">
              <SignOut className="w-full" />
            </li>
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
