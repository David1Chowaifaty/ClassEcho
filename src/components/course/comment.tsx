"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  CaretDownIcon,
  CaretUpIcon,
  PaperPlaneIcon,
} from "@radix-ui/react-icons";
import { Input } from "../ui/input";
import { AnimatePresence } from "framer-motion";
import ViewComments, { Comment } from "../view-comments";

export default function Comment() {
  const [comment, setComment] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    {
      userId: "user2",
      commentId: "comment2",
      likes: 2,
      message: "Thanks for the help!",
      userName: "Sheila Johnson",
      createdAt: new Date("2023-07-28T15:30:00"),
    },
    {
      userId: "user2",
      commentId: "comment3",
      likes: 2,
      message: "What should I do now",
      userName: "Sheila Johnson",
      createdAt: new Date("2023-07-28T15:30:00"),
    },
    {
      userId: "user3",
      commentId: "comment3",
      likes: 0,
      message: "Great job!",
      userName: "John Doe",
      createdAt: new Date("2023-07-27T18:15:00"),
    },
    {
      userId: "1",
      commentId: "comment3",
      likes: 0,
      message: "well done",
      userName: "David",
      createdAt: new Date("2023-07-27T18:15:00"),
    },
  ]);
  return (
    <section className="flex bg-gradient-to-br from-slate-50 to-white items-center flex-col dark:from-slate-900  gap-3 py-2 px-4 rounded-lg">
      <div className="flex items-center justify-between my-2 w-full">
        <h1 className="text-xl font-medium ">Comments</h1>
        <p className="text-sm text-gray-400">{comments.length} comments</p>
      </div>
      {!isOpen && (
        <Button variant={"ghost"} onClick={() => setIsOpen((prev) => !prev)}>
          show comments <CaretDownIcon />
        </Button>
      )}
      <AnimatePresence>
        {isOpen && <ViewComments comments={comments} />}
      </AnimatePresence>
      {isOpen && (
        <>
          <p>Add Comment</p>
          <form className="flex flex-col py-2 border-slate-200  bg-white rounded-lg border dark:border-slate-800 px-2 gap-2 w-full dark:bg-slate-950 h-36">
            <Input
              className="rounded-md bg-inherit border-0 flex-1 "
              placeholder="Add your comment here"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <Button
              type="button"
              className="self-end gap-2"
              onClick={() => {
                setComments((prev) => [
                  {
                    userId: "1",
                    commentId: "comment" + comment,
                    likes: 0,
                    message: comment,
                    userName: "David",
                    createdAt: new Date(),
                  },
                  ...prev,
                ]);
              }}
            >
              <p>Publish</p>
              <PaperPlaneIcon className="-rotate-45" />
            </Button>
          </form>

          <Button
            variant={"ghost"}
            type={"button"}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            hide comments <CaretUpIcon />
          </Button>
        </>
      )}
    </section>
  );
}
