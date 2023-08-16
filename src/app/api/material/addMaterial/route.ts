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
      course_id: z.coerce.number(),
      title: z.string(),
      description: z.string(),
      url: z.string().optional(),
    });
    const body = await req.json();
    const { course_id, url, description, title } = scheme.parse(body);
    if (url) {
      const result = await db.material.create({
        data: {
          material_description: description,
          title,
          course_id,
          uploads: {
            create: {
              storage_url: url,
            },
          },
        },
      });
      return new Response(JSON.stringify(result));
    } else {
      const result = await db.material.create({
        data: {
          material_description: description,
          title,
          course_id,
        },
      });
      return new Response(JSON.stringify(result));
    }
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error), { status: 405 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
