import BackButton from "@/components/back-button";
import LoginForm from "@/components/login-form";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main className="flex justify-between items-center h-[80vh]">
      <section className="flex flex-col sm:px-6 items-center px-4 gap-5 mt-10 h-full w-full lg:w-[50vw] lg:px-10 lg:items-start ">
        <h1 className="text-3xl font-semibold self-start mb-16">Sign In</h1>
        <LoginForm />
        <span className="text-sm">
          {`Don't have an account?`}
          <Link
            href={"/register"}
            className={buttonVariants({ variant: "link" })}
          >
            Register.
          </Link>
        </span>
      </section>
      <section className="hidden h-screen w-[50vw] lg:block" id="home" />
    </main>
  );
}
