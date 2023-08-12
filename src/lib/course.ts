import { Course } from "@/app/course/[id]/page";
import { db } from "./db";
import z from "zod";
export async function getCourses(id: string) {
  try {
    const schema = z.coerce.number();
    const creator = schema.parse(id);
    const data = db.course.findMany({
      where: {
        OR: [
          {
            creator,
          },
          {
            enrolled: {
              some: {
                student_id: creator,
              },
            },
          },
        ],
      },
    });
    return data;
  } catch (error) {
    throw new Error("Something went wrong please try again later");
  }
}

export async function getCourse(id: string): Promise<Course | null> {
  try {
    const scheme = z.coerce.number();
    const course_id = scheme.parse(id);
    const course = db.course.findFirst({ where: { course_id } });
    const material = db.material.findMany({
      where: { course_id },
      include: {
        uploads: {
          select: {
            storage_url: true,
            upload_id: true,
            material_id: true,
          },
        },
      },
    });
    const [course_result, material_result] = await Promise.all([
      course,
      material,
    ]);
    if (!course_result || !material_result) {
      return null;
    }

    return {
      ...course_result,
      materials: material_result,
    };
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
