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
      enrollment_id: z.coerce.number(),
    });
    const body = await req.json();
    const { enrollment_id } = scheme.parse(body);
    await db.enrollments.delete({
      where: {
        enrollment_id,
      },
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
