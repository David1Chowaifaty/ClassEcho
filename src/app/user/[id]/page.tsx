import { FC } from "react";
import axios from "axios";
import Link from "next/link";
import CourseCard from "@/components/course-card";
import CreateCourseButton from "@/components/create-course";
import { getServerSession } from "next-auth";
import JoinCourse from "@/components/join-course";
import { buttonVariants } from "@/components/ui/button";
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
  const session = await getServerSession();
  if (!data) {
    return (
      <main className="p-4 min-h-[80vh] sm:px-6  pb-8  mt-5  lg:px-10 ">
        <section className="grid gap-5 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from(Array(4), (_, i) => i).map((i) => (
            <div
              key={i}
              className="h-48 w-full flex p-5 flex-col gap-5 rounded-lg md:max-w-sm bg-slate-300 border border-slate-400 animate-pulse dark:bg-slate-900 dark:border-slate-800"
            >
              <span className="block bg-slate-400 h-10 w-10 rounded-full animate-pulse delay-100 dark:bg-slate-800" />
              <span className="block bg-slate-400 h-5 w-full rounded-full animate-pulse delay-200 dark:bg-slate-800" />
              <span className="block bg-slate-400 h-5 w-full rounded-full animate-pulse delay-300 dark:bg-slate-800" />
            </div>
          ))}
        </section>
      </main>
    );
  } else {
    return (
      <main className="p-4 min-h-[80vh] sm:px-6  pb-8  mt-5  lg:px-10 ">
        {data.length === 0 && (
          <section className="w-full flex flex-col items-center justify-center h-[50vh] gap-5">
            <p className="text-center w-full">
              No courses found Join or Create Course
            </p>
            <div className="flex items-center gap-4">
              <CreateCourseButton
                id={session?.user.name!}
                className={buttonVariants({ variant: "default" })}
              />
              <JoinCourse
                id={session?.user.name!}
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
  }
};

export default page;
