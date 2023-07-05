"use client";
import { Input } from "./ui/input";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const params = useSearchParams();
  const error = params?.get("error");
  useEffect(() => {
    switch (error) {
      case "Email doesn't exist":
        setEmailError(true);
        break;
      case "Invalid Password":
        setPasswordError(true);
        break;
    }
  }, [error]);
  async function handleSignUp(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        "https://classechoapi.onrender.com/api/register",
        {
          email,
          password,
        }
      );
      const res = await signIn("credentials", { email, password });
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {error && (
        <Alert variant="destructive" className="max-w-lg">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>

          <AlertDescription>
            Your Email Or Password might be wrong
          </AlertDescription>
        </Alert>
      )}

      <Input
        placeholder="Email"
        onFocus={() => setEmailError(false)}
        className={cn(
          "max-w-lg",
          emailError && "border-red-500/50  dark:border-red-500"
        )}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        onFocus={() => setPasswordError(false)}
        className={cn(
          "max-w-lg",
          passwordError && "border-red-500/50 dark:border-red-500"
        )}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <Button
        className="w-full max-w-lg gap-5"
        disabled={isLoading || email === "" || password === ""}
        onClick={handleSignUp}
      >
        {isLoading && (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-5 h-5 mr-2 animate-spin  fill-white dark:fill-inherit"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        <p>Register</p>
      </Button>
    </>
  );
}
