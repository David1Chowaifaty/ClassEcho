import { db } from "@/lib/db";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const tab = req.url.split("/");
    const id = tab[tab.length - 1];
    const scheme = z.coerce.number();
    const course_id = scheme.parse(id);
    const students = await db.users.findMany({
      where: {
        course: {
          every: {
            enrolled: {
              some: {
                course_id,
              },
            },
          },
        },
      },
    });
    if (students.length > 0) {
      const enrolledStudents = await db.enrollments.findMany({
        where: {
          AND: [
            { course_id },
            {
              student_id: {
                in: students.map((student) => student.id),
              },
            },
          ],
        },
        select: {
          enrollment_id: true,
        },
      });

      return new Response(
        JSON.stringify(
          students.map((student) => ({
            ...student,
            enrollment_id: enrolledStudents.find(
              (es) => es.enrollment_id === student.id
            )?.enrollment_id,
          }))
        )
      );
    }

    return new Response(JSON.stringify(students));
  } catch (error) {}
}
