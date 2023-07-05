import BackButton from "@/components/back-button";
import LoginForm from "@/components/login-form";
import React from "react";

export default function page() {
  return (
    <main className="flex items-center flex-col gap-5">
      <BackButton title={"Back"} classname="self-start my-6 ml-4" />
      <h1 className="text-3xl font-semibold">Sign In</h1>
      <LoginForm />
    </main>
  );
}
