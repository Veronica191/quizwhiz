import React from "react"
import { useEffect } from "react"

// helper to decode HTML entities
const decodeHTML = (text = "") => {
  const txt = document.createElement("textarea")
  txt.innerHTML = text
  return txt.value
}

export default function Result({
  score = 0,
  total = 0,
  answers = [],        // ✅ SAFE DEFAULT
  onRestart = () => {},// ✅ SAFE DEFAULT
  onHome = () => {}    // ✅ SAFE DEFAULT
}) {
   // Save score to localStorage on component mount
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("quizHistory")) || []

    history.push({
      score,
      total,
      date: new Date().toLocaleDateString()
    })

    localStorage.setItem("quizHistory", JSON.stringify(history))
  }, [score, total]) // run only when score or total changes

  
  const percentage = total === 0 ? 0 : (score / total) * 100

  let feedback = "Better luck next time "
  let feedbackColor = "text-red-500"
  let borderColor = "border-red-500"

  if (percentage >= 70) {
    feedback = "Excellent work! "
    feedbackColor = "text-green-600"
    borderColor = "border-green-500"
  } else if (percentage >= 40) {
    feedback = "Good effort! "
    feedbackColor = "text-yellow-500"
    borderColor = "border-yellow-500"
  }

  return (
    <div className="bg-white rounded-xl shadow p-5 sm:p-6 md:p-8 text-center mt-6 sm:mt-10 max-w-md mx-auto">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
        Quiz Completed
      </h2>

      {/* Score Circle */}
      <div
        className={`
          w-24 h-24 sm:w-32 sm:h-32
          mx-auto mb-4
          rounded-full
          border-8 ${borderColor}
          flex flex-col items-center justify-center
        `}
      >
        <span className="text-2xl sm:text-3xl font-bold">{score}</span>
        <span className="text-xs sm:text-sm text-slate-500">/ {total}</span>
      </div>

      {/* Feedback */}
      <p className={`font-semibold mb-1 ${feedbackColor}`}>
        {feedback}
      </p>

      <p className="text-sm text-slate-500 mb-6">
        You answered {score} out of {total} questions correctly.
      </p>

      {/* Buttons */}
      <button
        onClick={onRestart}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold mb-4"
      >
        Retake Quiz
      </button>

      <button
        onClick={onHome}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold mb-6"
      >
        Back to Home
      </button>

      {/* Review Answers */}
      <div className="text-left">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Review Answers
        </h3>

        <div className="space-y-3">
          {answers.length === 0 ? (
            <p className="text-center text-slate-500">
              No answers to review.
            </p>
          ) : (
            answers.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  item.isCorrect
                    ? "border-green-500 bg-green-50"
                    : "border-red-500 bg-red-50"
                }`}
              >
                <p className="font-medium text-sm mb-1">
                  {index + 1}. {decodeHTML(item.question)}
                </p>

                <p className="text-sm">
                  Correct answer:{" "}
                  <span className="font-semibold text-green-700">
                    {decodeHTML(item.correctAnswer)}
                  </span>
                </p>

                <p className="text-sm font-semibold mt-1">
                  {item.isCorrect ? " Correct" : " Wrong"}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}