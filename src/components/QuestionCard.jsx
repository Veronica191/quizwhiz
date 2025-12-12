import React, { useState, useEffect } from "react"

export default function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }) {
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(15) // 15 seconds per question

  useEffect(() => {
    const shuffled = [...question.incorrect_answers, question.correct_answer].sort(() => Math.random() - 0.5)
    setAnswers(shuffled)
    setTimeLeft(15) // reset timer for each question
  }, [question])

  // Timer countdown
  useEffect(() => {
    if (timeLeft === 0) {
      onAnswer(false) // auto mark as incorrect if time runs out
      return
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft, onAnswer])

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <div className="mb-2">
        <div className="flex justify-between mb-1">
          <p>Question {questionNumber} of {totalQuestions}</p>
          <p>Time Left: {timeLeft}s</p>
        </div>
        <div className="w-full bg-gray-200 rounded h-2">
          <div
            className="bg-blue-500 h-2 rounded"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="mb-4" dangerouslySetInnerHTML={{ __html: question.question }}></h3>

      <div className="flex flex-col gap-2">
        {answers.map((answer, i) => (
          <button
            key={i}
            className="p-2 border rounded hover:bg-green-500 hover:text-white"
            onClick={() => onAnswer(answer === question.correct_answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  )
}
