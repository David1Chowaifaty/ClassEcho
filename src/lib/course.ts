import { Course } from "@/app/course/[id]/page";
import { CourseCard } from "@/app/user/[id]/page";
import axios from "axios";
export async function getCourses(id: string) {
  try {
    const url = `https://classechoapi.onrender.com/api/course/getCourses/${id}`;
    const res = await fetch(url, { cache: "no-cache" });
    const data = await res.json();
    return data as CourseCard[];
  } catch (error) {
    throw new Error("Something went wrong please try again later");
  }
}

export async function getCourse(id: string) {
  try {
    const url = `https://classechoapi.onrender.com/api/course/getSingleCourse/${id}`;
    const res = await fetch(url, { cache: "no-cache" });
    const data = await res.json();
    return data as Course[];
  } catch (error) {
    throw new Error("Something went wrong");
  }
}
