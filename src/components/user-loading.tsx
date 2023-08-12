"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function UserLoading() {
  return (
    <main className="min-h-[80vh] p-4 sm:px-6 lg:px-10">
      <section className="grid gap-5 items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from(Array(3), (_, i) => i).map((i) => (
          <Card
            key={i}
            className="h-40 shadow-sm border-gray-100 w-full before:absolute before:top-0 before:left-0 before:h-full before:w-full before:z-50"
            id="card"
            onMouseMove={(e) => {
              const { currentTarget: traget } = e;
              const rect = traget.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;
              traget.style.setProperty("--mouse-x", `${x}px`);
              traget.style.setProperty("--mouse-y", `${y}px`);
            }}
          >
            <CardHeader>
              <CardTitle className="w-32 h-7 bg-gradient-to-r from-gray-100  rounded-md animate-pulse  dark:from-slate-900 to-transparent" />
            </CardHeader>
            <CardContent>
              <CardDescription className="max-w-xs h-7 bg-gradient-to-r from-gray-100  rounded-md animate-pulse dark:from-slate-900 to-transparent"></CardDescription>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
