import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { ZodError, z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const scheme = z.object({
      id: z.coerce.number(),
      course_code: z.string(),
    });
    const res = await req.json();
    const { course_code, id } = scheme.parse(res);
    const course = await db.course.findFirst({ where: { course_code } });
    const alreadyJoined = await db.enrollments.findFirst({
      where: {
        AND: [{ course_id: course?.course_id }, { student_id: id }],
      },
    });
    if (course && !alreadyJoined) {
      const crs = await db.enrollments.create({
        data: {
          student_id: id,
          course_id: course.course_id,
        },
      });
      return new Response(JSON.stringify(crs));
    } else {
      return new Response(JSON.stringify("Course doesn't exist"), {
        status: 405,
      });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error), { status: 405 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
