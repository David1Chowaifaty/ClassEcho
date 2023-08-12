import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function validateEmail(email: string): boolean {
  const emailRegex: RegExp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}
export function validatePassword(password: string): boolean {
  const passwordRegex: RegExp =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$.!%*?&])[a-zA-Z\d@$!.%*?&]+$/;
  return passwordRegex.test(password);
}
