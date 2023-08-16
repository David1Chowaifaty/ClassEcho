import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const tags = await db.tags.findMany({ take: 10 });
    console.log(tags);
    return new Response(JSON.stringify(tags));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
