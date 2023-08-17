import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { ZodError, z } from "zod";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("UnAuthorized", { status: 401 });
    }
    const scheme = z.object({
      course_id: z.coerce.number(),
    });
    const body = await req.json();
    const { course_id } = scheme.parse(body);
    const enrolled = await db.enrollments.findFirst({
      where: {
        course_id,
        student_id: parseInt(session.user.id),
      },
    });
    if (!enrolled) {
      return new Response("user isn't enrolled in this course", {
        status: 405,
      });
    }
    await db.enrollments.delete({
      where: {
        course_id,
        enrollment_id: enrolled.enrollment_id,
      },
    });
    return new Response("success");
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error), { status: 405 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
