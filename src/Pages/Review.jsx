import React from "react"
import { useNavigate } from "react-router-dom"
import decodeHTML from "../utils/decodeHTML"
import { getQuizResult } from "../utils/storage"

export default function Review() {
  const navigate = useNavigate()
  const result = getQuizResult()
  const userAnswers = result?.answers ?? []

  return (
    <div className="text-left max-w-2xl mx-auto mt-6 p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Review Answers</h3>
        <button onClick={() => navigate("/results")} className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          Back to Results
        </button>
      </div>

      <div className="space-y-3">
        {userAnswers.length === 0 ? (
          <p className="text-center text-slate-500">
            No answers to review.
          </p>
        ) : (
          userAnswers.map((item, index) => (
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
                {item.isCorrect ? "Correct" : "Wrong"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
