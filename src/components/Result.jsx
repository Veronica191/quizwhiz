import React from "react"

export default function Result({ score, total }) {
  const feedback = score / total > 0.7
    ? "Excellent!"
    : score / total > 0.4
    ? "Good"
    : "Better luck next time"

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Finished</h2>
      <p className="mb-2">You scored {score} out of {total}</p>
      <p className="font-semibold">{feedback}</p>
      <button
        className="mt-4 p-2 border rounded hover:bg-blue-500 hover:text-white"
        onClick={() => window.location.reload()}
      >
        Restart Quiz
      </button>
    </div>
  )
}
