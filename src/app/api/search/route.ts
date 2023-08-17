import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("UnAuthorized", { status: 401 });
    }
    const { debouncedValue } = await req.json();
    const tags = await db.tags.findFirst({ where: { tag: debouncedValue } });
    if (tags) {
      const results = await db.course.findMany({
        where: {
          OR: [
            {
              description: {
                search: debouncedValue,
              },
            },
            {
              course_name: {
                search: debouncedValue,
              },
            },
            {
              tag_id: tags.tag_id,
            },
          ],
        },
      });
      const countEnrolledStudent = await db.enrollments.findMany({
        where: {
          course_id: {
            in: results.map((result) => result.course_id),
          },
        },
        select: {
          course_id: true,
          enrollment_id: true,
          student_id: true,
        },
      });
      console.log(results);
      return new Response(
        JSON.stringify(
          results.map((result) => ({
            ...result,
            enrolledStudents: countEnrolledStudent,
          }))
        )
      );
    } else {
      const results = await db.course.findMany({
        where: {
          OR: [
            {
              description: {
                search: debouncedValue,
              },
            },
            {
              course_name: {
                search: debouncedValue,
              },
            },
          ],
        },
      });
      const countEnrolledStudent = await db.enrollments.findMany({
        where: {
          course_id: {
            in: results.map((result) => result.course_id),
          },
        },
        select: {
          course_id: true,
          enrollment_id: true,
          student_id: true,
        },
      });
      console.log(results);
      return new Response(
        JSON.stringify(
          results.map((result) => ({
            ...result,
            enrolledStudents: countEnrolledStudent,
          }))
        )
      );
    }
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
