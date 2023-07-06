import { FC } from "react";
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
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
interface CustomAlertProps {
  handleClick: () => any;
  triggerContent: React.ReactNode;
  body?: string;
  className?: string;
  triggerClassName?: string;
}

const CustomAlert: FC<CustomAlertProps> = ({
  handleClick,
  body,
  triggerContent,
  className,
  triggerClassName,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn(className)}>
        {triggerContent}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {body ||
              `This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              buttonVariants({
                variant: "destructive",
              }),
              triggerClassName
            )}
            onClick={handleClick}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
