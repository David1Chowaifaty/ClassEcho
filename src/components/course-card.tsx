"use client";
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface CourseCardProps {
  name: string;
  description: string;
}

const CourseCard: FC<CourseCardProps> = ({ description, name }) => {
  return (
    <Card
      className="h-48 w-full before:absolute before:top-0 before:left-0 before:h-full before:w-full before:z-50"
      id="card"
      onMouseMove={(e) => {
        const { currentTarget: traget } = e;
        const rect = traget.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;
        traget.style.setProperty("--mouse-x", `${x}px`);
        traget.style.setProperty("--mouse-y", `${y}px`);
      }}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p className="truncate max-w-xs">{description}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
