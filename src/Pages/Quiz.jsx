import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Result from "./Result";
import ProgressBar from "../components/ProgressBar";

export default function Quiz({ onHome }) {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedCategoryId = location.state?.categoryId;

  const [difficulty, setDifficulty] = useState("easy");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  // 🔴 If no category, go home
  if (!selectedCategoryId) {
    navigate("/home");
    return null;
  }

  // 🔹 Start quiz manually
  const startQuiz = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedCategoryId}&difficulty=${difficulty}&type=multiple`
      );

      if (res.status === 429) {
        setError("Too many requests. Please wait and try again.");
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        setError("No questions available.");
        setLoading(false);
        return;
      }

      setQuestions(data.results);
      setQuizStarted(true);
    } catch {
      setError("Failed to load questions.");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 BEFORE QUIZ STARTS (Difficulty Selection)
  if (!quizStarted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-center">
          Select Difficulty
        </h2>

        <div className="flex justify-center gap-3 mb-6">
          {["easy", "medium", "hard"].map(level => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded-full capitalize font-medium
                ${
                  difficulty === level
                    ? "bg-blue-600 text-white"
                    : "bg-slate-200 hover:bg-slate-300"
                }`}
            >
              {level}
            </button>
          ))}
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
        >
          Start Quiz
        </button>

        {error && (
          <p className="text-red-500 text-center mt-4">{error}</p>
        )}
      </div>
    );
  }

  // 🔹 QUIZ IN PROGRESS
  if (currentIndex < questions.length) {
    const progress = ((currentIndex + 1) / questions.length) * 100;

    return (
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <button
          onClick={onHome}
          className="text-sm text-blue-600 mb-3 hover:underline"
        >
          ← Back to Home
        </button>

        <ProgressBar progress={progress} />

        <QuestionCard
          question={questions[currentIndex]}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          onAnswer={({ answer, isCorrect }) => {
            setUserAnswers(prev => [
              ...prev,
              {
                question: questions[currentIndex].question,
                selectedAnswer: answer,
                correctAnswer:
                  questions[currentIndex].correct_answer,
                isCorrect,
              },
            ]);

            if (isCorrect) setScore(prev => prev + 1);
            setCurrentIndex(prev => prev + 1);
          }}
        />
      </div>
    );
  }

  // 🔹 QUIZ FINISHED
  return (
    <Result
      score={score}
      total={questions.length}
      answers={userAnswers}
      onRestart={() => {
        setQuizStarted(false);
        setCurrentIndex(0);
        setScore(0);
        setUserAnswers([]);
        setQuestions([]);
      }}
      onHome={onHome}
    />
  );
}