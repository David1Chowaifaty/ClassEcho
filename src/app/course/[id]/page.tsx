import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/components/back-button";
import AddMaterial from "@/components/course/add-material";
import ClipboardButton from "@/components/course/clipboard-button";
import { cn } from "@/lib/utils";
import CourseOptions from "@/components/course/course-options";
import { getCourse } from "@/lib/course";
import { getSession } from "@/lib/session";

interface CoursePageProps {
  params: { id: string };
}
export type Course = {
  course_id: number;
  creator: number;
  createdAt: Date | null;
  course_name: string;
  description: string;
  course_code: string | null;
  material_id: number;
  title: string;
  material_description: string;
};

const CoursePage: FC<CoursePageProps> = async ({ params }) => {
  const data = await getCourse(params.id);
  const ligthColor = ["from-purple-200", "from-green-200", "from-violet-200"];
  const darkColor = [
    "dark:from-blue-950",
    "dark:from-purple-950",
    "dark:from-cyan-950",
    "dark:from-sky-950",
    "dark:from-violet-950",
    "dark:from-teal-950",
  ];
  const session = await getSession();
  const rand = Math.floor(Math.random() * ligthColor.length);
  const admin = session?.user.id?.toString() === data[0].creator.toString();
  return (
    <>
      <main className="px-4 min-h-[80vh] sm:px-6 lg:px-10">
        <BackButton title={"Courses"} />
        <Card
          className={cn(
            "mt-5 bg-gradient-to-tr relative  to-white dark:bg-gradient-to-tr  dark:to-slate-950",
            ligthColor[rand],
            darkColor[Math.floor(Math.random() * darkColor.length)]
          )}
        >
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <p>{data[0].course_name}</p>
              <CourseOptions
                id={session?.user.id!}
                course_code={data[0].course_code || ""}
                admin={admin}
              />
            </CardTitle>
            {data[0].course_code && (
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 ">
                <ClipboardButton code={data[0].course_code} />
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center text-sm">
              <p>{data[0].description}</p>
              {admin && <AddMaterial course_id={params.id} />}
            </div>
          </CardContent>
        </Card>

        {!data[0].material_id ? (
          <div className="h-[40vh] w-full flex items-center justify-center">
            <p>No Result</p>
          </div>
        ) : (
          <section className="py-20">
            <h1 className="text-xl font-medium ">Materials</h1>
            {data.map((material) => (
              <Card className="mt-5" key={material.material_id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <p>{material.title}</p>
                    {/* <CourseOptions
                      id={session?.user.name!}
                      course_code={data[0].course_code || ""}
                      admin={
                        session?.user.name?.toString() ===
                        data[0].creator.toString()
                      }
                    /> */}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col justify-between gap-5">
                    <p>{material.material_description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>
        )}
        {/* <Comment /> */}
      </main>
    </>
  );
};

export default CoursePage;
