"use client";
import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Cross1Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import useDebounce from "@/hooks/useDebounce";
import axios from "axios";

export default function SearchBar() {
  const [searchResult, setSearchResult] = useState("");
  const debouncedValue = useDebounce(searchResult, 500);
  useEffect(() => {
    (async () => {
      if (debouncedValue === searchResult && searchResult !== "") {
        const { data } = await axios.post("/api/search", {
          debouncedValue,
        });
        console.log(data);
      }
    })();
  }, [debouncedValue, searchResult]);
  return (
    <form className="flex h-10 items-center w-full max-w-lg rounded-md border border-slate-200  bg-white px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-400 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-800">
      <MagnifyingGlassIcon />
      <input
        type="text"
        placeholder="search..."
        className="bg-transparent flex-1 px-2 focus:outline-none"
        onChange={(e) => setSearchResult(e.target.value)}
      />
      {searchResult && (
        <Button variant={"ghost"} size={"icon"} type="reset">
          <Cross1Icon />
          <p className="sr-only">clear search</p>
        </Button>
      )}
    </form>
  );
}
