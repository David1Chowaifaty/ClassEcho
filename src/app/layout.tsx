import { avatarName, cn } from "@/lib/utils";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import AddCourse from "@/components/course/add-course";
import { buttonVariants } from "@/components/ui/button";
import Provider from "@/components/Provider";
//import { Analytics } from "@vercel/analytics/react";
import SignOut from "@/components/nav/SignOut";
const inter = Inter({ subsets: ["latin"] });
import { ModeToggle } from "@/components/nav/theme-toggle";
import { getSession } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata = {
  title: "ClassEcho",
  description: "Discover a new world of learning and knowledge",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "bg-white dark:bg-gray-950 dark:text-slate-100"
        )}
      >
        <Provider session={session}>
          <header className="h-16 z-30 sticky top-0">
            <nav className="sm:px-6 h-full bg-white/50 backdrop-blur-md px-4 lg:px-10  flex items-center justify-between dark:bg-gray-950/50">
              <Link href={"/"}>ClassEcho</Link>
              {!session ? (
                <ul className="flex items-center gap-5">
                  <li>
                    <Link
                      href={"/register"}
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/login"}
                      className={buttonVariants({ variant: "secondary" })}
                    >
                      Login
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="flex items-center gap-4 ">
                  <li>
                    <AddCourse id={session.user.id!} />
                  </li>
                  <li>
                    <ModeToggle />
                  </li>
                  <li>
                    <SignOut />
                  </li>
                  <li>
                    <Avatar>
                      <AvatarImage src={session.user.image!} />
                      <AvatarFallback>
                        <p>{avatarName(session.user.name!)}</p>
                      </AvatarFallback>
                    </Avatar>
                  </li>
                </ul>
              )}
            </nav>
          </header>
          {children}
          <footer>
            <h3 className="text-sm text-center py-5">@2023 ClassEcho</h3>
          </footer>
        </Provider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}
