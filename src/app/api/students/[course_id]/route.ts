import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const tab = req.url.split("/");
    const id = tab[tab.length - 1];
    const scheme = z.coerce.number();
    const course_id = scheme.parse(id);
    const students = await db.users.findMany({
      where: {
        enrollements: {
          some: {
            course_id,
          },
        },
      },
    });
    console.log(students);
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
          student_id: true,
        },
      });
      console.log(
        students.map((student) => ({
          ...student,
          enrollment_id: enrolledStudents.find(
            (es) => es.student_id === student.id
          )?.enrollment_id,
        }))
      );
      return new Response(
        JSON.stringify(
          students.map((student) => ({
            ...student,
            enrollment_id: enrolledStudents.find(
              (es) => es.student_id === student.id
            )?.enrollment_id,
          }))
        )
      );
    }

    return new Response(JSON.stringify(students));
  } catch (error) {}
}
