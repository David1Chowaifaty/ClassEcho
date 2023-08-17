"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";
import { Course, Tags } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { RecentSearchLink, ResultLink } from "./result-link";
export type enrolledStudent = {
  course_id: number;
  enrollment_id: number;
  student_id: number;
};
interface SearchResult extends Course {
  enrolledStudents: enrolledStudent[];
}
export default function SearchBar({ id }: { id: number }) {
  const [searchResult, setSearchResult] = useState("");
  const debouncedValue = useDebounce(searchResult, 500);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearchs, setRecentSearchs] = useState<Course[]>([]);
  const [trendingTopics, setTrendingTopic] = useState<Tags[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const tagsResult = await axios.get("/api/getTags");
        if (tagsResult) {
          setTrendingTopic(tagsResult.data);
        }
        const recentSearchResult = localStorage.getItem("recentSearchResults");
        if (recentSearchResult) {
          setRecentSearchs(JSON.parse(recentSearchResult));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        if (debouncedValue === searchResult && searchResult !== "") {
          const { data } = await axios.post("/api/search", {
            debouncedValue,
          });
          setResults(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [debouncedValue, searchResult]);
  const reset = useCallback(() => {
    setResults([]);
    setSearchResult("");
  }, []);
  const handleTopicClick = useCallback((tag: string) => {
    setSearchResult(tag);
  }, []);
  return (
    <>
      <Dialog onOpenChange={reset}>
        <DialogTrigger>
          <div className="relative flex h-10 items-center w-full max-w-lg rounded-md border border-slate-200  bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800">
            <MagnifyingGlassIcon />
            <input
              type="text"
              placeholder="search..."
              className="hidden md:block bg-transparent flex-1 px-2 focus:outline-none"
            />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="mt-4">
            <form className="flex h-10 items-center w-full max-w-lg rounded-md border border-slate-200  bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800">
              <MagnifyingGlassIcon />
              <input
                type="text"
                placeholder="search..."
                className="bg-transparent flex-1 px-2 focus:outline-none"
                value={searchResult}
                onChange={(e) => setSearchResult(e.target.value)}
              />
              {searchResult && (
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  type="reset"
                  onClick={reset}
                >
                  <Cross1Icon />
                  <p className="sr-only">clear search</p>
                </Button>
              )}
            </form>
          </DialogHeader>
          {results.length > 0 && (
            <>
              <h2 className="font-medium text-lg">Results</h2>
              {results?.map((result) => (
                <ResultLink id={id} key={result.course_id} {...result} />
              ))}
              <span className="block h-[1px] bg-gray-100 w-full rounded-sm " />
            </>
          )}
          <h2 className="font-medium text-lg">Trending Topic</h2>
          <div className="flex items-center flex-wrap gap-5">
            {trendingTopics?.map((topic) => (
              <Button
                variant={"outline"}
                key={"topic" + topic.tag_id}
                onClick={() => handleTopicClick(topic.tag)}
              >
                {topic.tag}
              </Button>
            ))}
          </div>
          {/* {recentSearchs.length > 0 && (
            <>
              <span className="block h-[1px] bg-gray-100 w-full rounded-sm " />
              <h2 className="font-medium text-lg">Recent Search</h2>
              <div className="flex items-center flex-wrap gap-5 h-[150px] lg:h-64 overflow-y-auto">
                {recentSearchs.map((recentSearch) => (
                  <RecentSearchLink
                    key={"recent" + recentSearch.course_id}
                    {...recentSearch}
                  />
                ))}
              </div>
            </>
          )} */}
        </DialogContent>
      </Dialog>
    </>
  );
}
