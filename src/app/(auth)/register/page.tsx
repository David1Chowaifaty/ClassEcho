import BackButton from "@/components/back-button";
import RegisterForm from "@/components/register-form";
import React from "react";

export default function page() {
  return (
    <main className="flex items-center flex-col gap-5">
      <BackButton title={"Back"} classname="self-start my-6 ml-4" />
      <h1 className="text-3xl font-semibold">Register</h1>
      <RegisterForm />
    </main>
  );
}
