import { db } from "@/lib/db";
import { getSession } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("UnAuthorized", { status: 401 });
    }
    const { debouncedValue } = await req.json();
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
            tags: {
              some: {
                tag: {
                  search: debouncedValue,
                },
              },
            },
          },
        ],
      },
    });
    console.log(results);
    return new Response(JSON.stringify(results));
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
