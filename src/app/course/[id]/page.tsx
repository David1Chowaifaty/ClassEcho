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
  const url = `http://localhost:5080/api/getSingleCourse/${params.id}`;
  const { data }: { data: Course[] } = await axios.get(url);

  return (
    <main className="px-10">
      <BackButton />
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>{data[0].course_name}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="flex justify-between items-center">
            <p>{data[0].description}</p>
            <AddMaterial course_id={params.id} />
          </CardDescription>
        </CardContent>
      </Card>

      {!data[0].material_id ? (
        <p className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] ">
          No Result
        </p>
      ) : (
        <>
          <h1 className="text-xl pt-10 font-medium ">Materials</h1>
          {data.map((material) => (
            <Card
              className="mt-5 bg-slate-50 dark:bg-slate-800/60"
              key={material.material_id}
            >
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
        </>
      )}
    </main>
  );
};

export default page;
