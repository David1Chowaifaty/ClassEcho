import { FC } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
interface PageProps {
  params: { id: string };
}
type Course = {
  course_id: number;
  creator: number;
  createdAt: Date;
  course_name: string;
  description: string;
};

const page: FC<PageProps> = async ({ params }) => {
  const url = `http://localhost:5080/api/getCourses/${params.id}`;
  const { data }: { data: Course[] } = await axios.get(url);

  return (
    <main className="px-10 grid gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {data?.map((item) => {
        return (
          <Link href={`/course/${item.course_id}`} key={item.course_id}>
            <Card className="h-48 hover:bg-slate-50/50 transition-all duration-100 ease-in-out dark:hover:bg-slate-900">
              <CardHeader>
                <CardTitle>{item.course_name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </main>
  );
};

export default page;
