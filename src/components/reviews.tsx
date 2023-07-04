import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ReviewsProps {
  name: string;
  description: string;
  image: string | undefined;
}

const Reviews: FC<ReviewsProps> = ({
  name,
  description,
  image,
}: ReviewsProps) => {
  return (
    <Card className="w-full h-56">
      <CardHeader>
        <Avatar>
          <AvatarImage src={image} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">{name}</CardFooter>
    </Card>
  );
};

export default Reviews;
