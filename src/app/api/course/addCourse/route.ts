import { ta } from "date-fns/locale";
import { db } from "@/lib/db";
import { getSession } from "@/lib/session";
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

async function createCourse(
  name: string,
  id: number,
  description: string,
  tag_id: number | null = null
) {
  return db.course.create({
    data: {
      course_name: name,
      course_code: generateCode(),
      creator: id,
      description,
      tag_id,
    },
  });
}

async function createTagIfNotExist(tag: string) {
  const tagResult = await db.tags.findFirst({
    where: {
      tag,
    },
  });

  if (!tagResult) {
    const createdTag = await db.tags.create({
      data: {
        tag,
      },
    });
    return createdTag.course_id;
  } else {
    return tagResult.tag_id;
  }
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const scheme = z.object({
      id: z.coerce.number(),
      name: z.string(),
      description: z.string(),
      tag: z.string().optional(),
    });

    const requestData = await req.json();
    const { tag, name, id, description } = scheme.parse(requestData);
    if (tag) {
      const tagExist = await db.tags.findFirst({ where: { tag } });
      if (!tagExist) {
        const newTag = await db.tags.create({
          data: {
            tag,
          },
        });
        const course = await createCourse(name, id, description, newTag.tag_id);
        return new Response(JSON.stringify(course));
      } else {
        const course = await createCourse(
          name,
          id,
          description,
          tagExist.tag_id
        );
        return new Response(JSON.stringify(course));
      }
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error), { status: 405 });
    }
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
