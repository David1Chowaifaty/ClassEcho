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

import BackButton from "@/components/back-button";
import AddMaterial from "@/components/add-material";
import ClipboardButton from "@/components/clipboard-button";
import { getServerSession } from "next-auth";

interface PageProps {
  params: { id: string };
}
type Course = {
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

const page: FC<PageProps> = async ({ params }) => {
  const url = `https://classechoapi.onrender.com/api/getSingleCourse/${params.id}`;
  const { data }: { data: Course[] } = await axios.get(url);
  const session = await getServerSession();
  return (
    <main className="px-10">
      <BackButton title={"Courses"} />
      <Card className="mt-5 bg-slate-50 dark:bg-slate-800/60">
        <CardHeader>
          <CardTitle>{data[0].course_name}</CardTitle>
          {data[0].course_code && (
            <CardDescription className="flex items-center gap-4">
              <ClipboardButton code={data[0].course_code} />
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-between items-center">
            <p>{data[0].description}</p>
            {session?.user.name?.toString() === data[0].creator.toString() && (
              <AddMaterial course_id={params.id} />
            )}
          </CardDescription>
        </CardContent>
      </Card>

      {!data[0].material_id ? (
        <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ">
          No Result
        </p>
      ) : (
        <section className="py-20">
          <h1 className="text-xl font-medium ">Materials</h1>
          {data.map((material) => (
            <Card className="mt-5" key={material.material_id}>
              <CardHeader>
                <CardTitle>{material.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="flex justify-between items-center">
                  <p>{material.material_description}</p>
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </section>
      )}
    </main>
  );
};

export default page;
