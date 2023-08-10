import { FC } from "react";
import Link from "next/link";
import CourseCard from "@/components/course/course-card";
import CreateCourseButton from "@/components/course/create-course";
import JoinCourse from "@/components/course/join-course";
import { buttonVariants } from "@/components/ui/button";
import { getCourses } from "@/lib/course";
import { getSession } from "@/lib/session";

interface PageProps {
  params: { id: string };
  searchParams: { [key: string]: string[] | string | undefined };
}
export type CourseCard = {
  course_id: number;
  creator: number;
  createdAt: Date;
  course_name: string;
  description: string;
};

const page: FC<PageProps> = async ({ params, searchParams }) => {
  const page = searchParams["page"] ?? "1";
  const perpage = searchParams["perpage"] ?? "15";
  const data = await getCourses(params.id);
  const session = await getSession();
  return (
    <main className="p-4 min-h-[80vh] sm:px-6  pb-8  mt-5  lg:px-10 ">
      {data.length === 0 && (
        <section className="w-full flex flex-col items-center justify-center h-[50vh] gap-5">
          <p className="text-center w-full">
            No courses found Join or Create Course
          </p>
          <div className="flex items-center gap-4">
            <CreateCourseButton
              id={session?.user.id!}
              className={buttonVariants({ variant: "default" })}
            />
            <JoinCourse
              id={session?.user.id!}
              className={buttonVariants({ variant: "outline" })}
            />
          </div>
        </section>
      )}
      <section className="grid gap-5 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
      </section>
    </main>
  );
};

export default page;
