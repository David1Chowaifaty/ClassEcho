import { db } from "@/lib/db";
import { ZodError, z } from "zod";

export async function POST(req: Request) {
  try {
    const scheme = z.object({
      course_id: z.coerce.number(),
    });
    const body = await req.json();
    const { course_id } = scheme.parse(body);
    await db.$transaction(async (ts) => {
      const course_materials_id = await ts.material.findMany({
        where: {
          course_id,
        },
        select: {
          material_id: true,
        },
      });
      if (course_materials_id.length > 0) {
        await ts.uploads.deleteMany({
          where: {
            material_id: {
              in: course_materials_id.map((cmi) => cmi.material_id),
            },
          },
        });
        await ts.material.deleteMany({
          where: { course_id },
        });
        await ts.enrollments.deleteMany({
          where: { course_id },
        });
        await ts.course.delete({ where: { course_id } });
      } else {
        await ts.enrollments.deleteMany({
          where: { course_id },
        });
        await ts.course.delete({ where: { course_id } });
      }
    });
    return new Response(JSON.stringify("success"));
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error), { status: 405 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
