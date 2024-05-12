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
  const [numCorrect, setNumCorrect] = useState(0);
  const [finalResult, setFinalResult] = useState("");
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const submittedAnswers = quiz.map((question, index) => {
      const inputName =
        question.Type === "SA"
          ? index.toString()
          : `question_${question.Question}`;
      const inputElement = document.getElementsByName(inputName)[0];

      return {
        question: question.Question,
        answer: inputElement?.value || "",
      };
    });
    submittedAnswers.forEach((answer) => {
      const newQuestion = answer.question.replace(/\?/g, "");
      const newAnswer = answer.answer.replace(/\?/g, "");
      fetch(
        `http://localhost:8888/validate-answers/${newQuestion}/${newAnswer}`
      )
        .then((res) => res.text())
        .then((data) => {
          console.log(data.toLowerCase());
          if (data.toLowerCase().includes("yes")) {
            setNumCorrect(numCorrect + 1);
          }
        });
    });
    setFinalResult((numCorrect / submittedAnswers.length).toString());
  };

  return (
    <main className="h-full bg-base-300">
      <Header />
      <h2 className="pt-20 text-4xl text-center">{formatedClassName} Quiz</h2>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="grid gap-6 w-max">
          {quiz.map((question, index) => (
            <div key={index} className="p-4 rounded-xl bg-base-100">
              <h4>{question.Question}</h4>
              {question.Type === "SA" ? (
                <input className="w-full input input-bordered" name={index} />
              ) : question.Type === "MC" ? (
                <div>
                  {question.Options.map((option, index) => (
                    <div key={index}>
                      <input
                        type="radio"
                        className="radio"
                        name={`question_${question.Question}`}
                        value={option.Answer}
                      />
                      <label className="ml-2">{option.Answer}</label>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
