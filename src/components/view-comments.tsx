import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export interface Comment {
  userId: string;
  commentId: string;
  likes: number;
  message: string;
  userName: string;
  createdAt: Date;
}

interface ViewCommentsProps {
  comments: Comment[];
}

const groupCommentsByDay = (comments: Comment[]): Map<string, Comment[]> => {
  const groupedComments = new Map<string, Comment[]>();

  comments.forEach((comment) => {
    const dateString = comment.createdAt.toDateString();
    if (groupedComments.has(dateString)) {
      groupedComments.get(dateString)?.push(comment);
    } else {
      groupedComments.set(dateString, [comment]);
    }
  });

  return groupedComments;
};

const ViewComments: FC<ViewCommentsProps> = ({ comments }) => {
  const groupedComments = groupCommentsByDay(comments);
  const session = useSession();
  console.log("object");
  console.log(groupedComments.values());
  return (
    <div className="w-full border-separate max-h-64 overflow-y-auto py-4">
      {Array.from(groupedComments.keys()).map((dateString) => {
        const commentsForDay = groupedComments.get(dateString) || [];
        return (
          <div
            key={dateString}
            className="w-full flex flex-col items-center gap-4"
          >
            <div className="flex gap-2 items-center self-center">
              <span className="h-0.5 rounded-full w-[30vw] bg-gray-200 dark:bg-gray-800 block" />
              <p className="text-gray-500 dark:text-gray-300">
                {dateString === new Date().toDateString()
                  ? "Today"
                  : dateString}
              </p>
              <span className="h-0.5 rounded-full w-[30vw] bg-gray-200 dark:bg-gray-800 block" />
            </div>
            {commentsForDay.map((comment) => (
              <div
                key={comment.commentId}
                className={cn(
                  "text-sm flex flex-col gap-3  py-2 w-full hover:bg-gray-100 dark:hover:bg-slate-800/50 backdrop-blur-md px-2 rounded-lg",
                  comment.userId === session.data?.user.name?.toString()
                    ? "items-end"
                    : "self-start"
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-2",
                    comment.userId === session.data?.user.name?.toString() &&
                      "flex-row-reverse"
                  )}
                >
                  <Avatar className="h-7 w-7 text-sm">
                    <AvatarImage src="" />
                    <AvatarFallback>
                      {comment.userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <p>{comment.userName}</p>
                </div>
                <p>{comment.message}</p>
                <div
                  className={cn(
                    "flex items-center gap-2 text-gray-400",
                    comment.userId === session.data?.user.name?.toString() &&
                      "flex-row-reverse"
                  )}
                >
                  <p>{comment.createdAt.toLocaleString()}</p>
                  <p>{`${comment.likes} ${
                    comment.likes === 1 ? "Like" : "Likes"
                  }`}</p>
                  <button
                    type="button"
                    aria-label="like button"
                    className="text-gray-500 dark:text-white"
                  >
                    {comment.likes > 0 ? (
                      <HeartFilledIcon className="h-5 w-5 text-red-500" />
                    ) : (
                      <HeartIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default ViewComments;
