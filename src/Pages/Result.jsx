import React from "react"
import { useNavigate } from "react-router-dom"
import decodeHTML from "../utils/decodeHTML"
import { getQuizResult, clearQuizResult } from "../utils/storage"

export default function Result() {
  const navigate = useNavigate()
  const result = getQuizResult()
  
  const score = result?.score ?? 0
  const total = result?.total ?? 0
  const answers = result?.answers ?? []
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
        onClick={() => { clearQuizResult(); navigate("/home"); }}
        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-full font-semibold mb-4"
      >
        Retake Quiz
      </button>

      <button
        onClick={() => navigate("/home")}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-full font-semibold mb-4"
      >
        Back to Home
      </button>

      <button
        onClick={() => navigate("/review")}
        className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-full font-semibold mb-6"
      >
        Review Answers
      </button>

      {/* Review Answers Preview */}
      <div className="text-left">
        <h3 className="text-lg font-semibold mb-3 text-center">Quick Summary</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {answers.length === 0 ? (
            <p className="text-center text-slate-500 text-sm">No answers to show.</p>
          ) : (
            answers.slice(0, 3).map((item, index) => (
              <div key={index} className={`p-2 rounded text-xs ${item.isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
                <p className="font-medium">{index + 1}. {decodeHTML(item.question)}</p>
              </div>
            ))
          )}
          {answers.length > 3 && <p className="text-xs text-slate-500 text-center">+ {answers.length - 3} more...</p>}
        </div>
      </div>

    </div>
  )
}