import React, { useState, useEffect } from "react"

// Decode HTML entities (VERY IMPORTANT for OpenTDB)
function decodeHTML(html) {
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}

export default function QuestionCard({
  question,
  onAnswer,
  questionNumber,
  totalQuestions
}) {
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(15)
  const [answered, setAnswered] = useState(false)

  const correctAnswer = decodeHTML(question.correct_answer)

  // Shuffle answers & reset state on new question
  useEffect(() => {
    const shuffledAnswers = [
      ...question.incorrect_answers,
      question.correct_answer
    ]
      .map(decodeHTML)
      .sort(() => Math.random() - 0.5)

    setAnswers(shuffledAnswers)
    setTimeLeft(15)
    setAnswered(false)
  }, [question])

  // Timer logic
  useEffect(() => {
    if (answered) return

    if (timeLeft === 0) {
      setAnswered(true)
      onAnswer({
        answer: null,
        isCorrect: false
      })
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, answered, onAnswer])

  function handleClick(answer) {
    if (answered) return

    setAnswered(true)

    const decodedAnswer = decodeHTML(answer)
    const decodedCorrect = decodeHTML(question.correct_answer)

    const isCorrect = decodedAnswer === decodedCorrect

    onAnswer({
      answer: decodedAnswer,
      isCorrect
    })
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 mt-6 sm:mt-10">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs sm:text-sm font-medium text-slate-600">
          Question {questionNumber} of {totalQuestions}
        </span>

        {/* Timer */}
        <div
          className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold
            ${
              timeLeft <= 5
                ? "bg-red-100 text-red-600 animate-pulse"
                : "bg-green-100 text-green-600"
            }
          `}
        >
          ⏱ {timeLeft}s
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-slate-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-2 bg-black-500 rounded-full transition-all duration-500"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-6">
        {decodeHTML(question.question)}
      </h3>

      {/* Answers */}
      <div className="grid gap-3">
        {answers.map((answer, i) => (
          <button
            key={i}
            disabled={answered}
            onClick={() => handleClick(answer)}
            className={`w-full px-4 py-3 rounded-lg border transition-all
              ${
                answered
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-white hover:bg-green-50 hover:border-green-500"
              }
            `}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  )
}
