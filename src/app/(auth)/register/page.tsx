import BackButton from "@/components/back-button";
import RegisterForm from "@/components/auth/register-form";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <main className="flex justify-between items-center h-[80vh]">
      <section className="flex flex-col items-center px-4 sm:px-6 gap-5 mt-10 h-full w-full lg:w-[50vw] lg:px-10 lg:items-start ">
        <h1 className="text-3xl font-semibold self-start mb-16">Register</h1>
        <RegisterForm />
        <span className="text-sm">
          Already have an account?
          <Link href={"/login"} className={buttonVariants({ variant: "link" })}>
            Login.
          </Link>
        </span>
      </section>
      <section className="hidden h-screen w-[50vw] lg:block" id="home" />
    </main>
  );
}
