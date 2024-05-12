"use client";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const className = searchParams.get("class");
  let formatedClassName = "";
  if (className == "Computer-Science") {
    formatedClassName = "Computer Science";
  } else {
    formatedClassName = className;
  }
  return (
    <main className="h-full bg-base-300">
      <Header />
      <h2 className="pt-20 text-4xl text-center">{formatedClassName} Quiz</h2>
    </main>
  );
}
