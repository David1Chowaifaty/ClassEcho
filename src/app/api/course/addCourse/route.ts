import { db } from "@/lib/db";
import { ZodError, z } from "zod";
function generateCode() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  let res = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    res += characters[randomIndex];
  }
  return res;
}
export async function POST(req: Request) {
  try {
    const scheme = z.object({
      id: z.coerce.number(),
      name: z.string(),
      description: z.string(),
    });
    const res = await req.json();
    const { name, id, description } = scheme.parse(res);
    const course = await db.course.create({
      data: {
        course_name: name,
        course_code: generateCode(),
        creator: id,
        description,
      },
    });
    return new Response(JSON.stringify(course));
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error), { status: 405 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
