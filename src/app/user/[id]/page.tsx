import { FC } from "react";
import axios from "axios";
import Link from "next/link";
import CourseCard from "@/components/course-card";
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
  const url = `https://classechoapi.onrender.com/api/getCourses/${params.id}`;
  const { data }: { data: Course[] } = await axios.get(url);
  return (
    <main className="px-10 grid gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {data?.map((item) => {
        return (
          <Link href={`/course/${item.course_id}`} key={item.course_id}>
            <CourseCard
              name={item.course_name}
              description={item.description}
            />
          </Link>
        );
      })}
    </main>
  );
};

export default page;