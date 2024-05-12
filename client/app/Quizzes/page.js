"use client";
import Header from "../components/Header";
import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

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

  fetch(`http://localhost:8888/generate-quiz/${className}/${user.username}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setQuiz(data);
    });
  return (
    <main className="h-full bg-base-300">
      <Header />
      <h2 className="pt-20 text-4xl text-center">{formatedClassName} Quiz</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 px-20 py-10">
        {quiz.map((item, index) => (
          <div className="card bg-base-100 shadow-xl" key={index}>
            <div className="card-body bg-blue-500 rounded-b-[20px] text-white">
              <h2 className="card-title text-2xl">{item.question}</h2>
              <p>{item.answer}</p>
              <div className="card-actions justify-end"></div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
