"use client";
import { FC, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";

interface ProviderProps {
  children: ReactNode;
  session: Session | null;
}

const Provider: FC<ProviderProps> = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <QueryClientProvider client={new QueryClient()}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
