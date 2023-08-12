import { db } from "@/lib/db";
import { hash } from "bcrypt";
import { ZodError, z } from "zod";

export async function POST(req: Request) {
  try {
    const scheme = z.object({
      email: z.string().email(),
      password: z
        .string()
        .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$.!%*?&])[a-zA-Z\d@$!.%*?&]+$/),
      username: z.string(),
    });
    const res = await req.json();
    const { email, password, username } = scheme.parse(res);
    const hashedPassword = await hash(password, 10);
    const user = await db.users.create({
      data: {
        email,
        profile: "",
        password: hashedPassword,
        username,
      },
    });
    return new Response(JSON.stringify("success"));
  } catch (error) {
    if (error instanceof ZodError) {
      return new Response(JSON.stringify(error.message), { status: 405 });
    }
    return new Response(JSON.stringify(error));
  }
}
