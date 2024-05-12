"use client";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";

export default function page() {
  const { isSignedIn, user, isLoaded } = useUser();
  const searchParams = useSearchParams();
  const className = searchParams.get("class");
  const [quiz, setQuiz] = useState([]);
  let formatedClassName = "";
  if (className == "Computer-Science") {
    formatedClassName = "Computer Science";
  } else {
    formatedClassName = className;
  }

  useEffect(() => {
    fetch(`http://localhost:8888/generate-quiz/${className}/${user.username}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuiz(data);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, []);

  return (
    <main className="h-full bg-base-300">
      <Header />
      <h2 className="pt-20 text-4xl text-center">{formatedClassName} Quiz</h2>
    </main>
  );
}
