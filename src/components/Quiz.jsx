import React, { useState, useEffect } from "react"
import QuestionCard from "./QuestionCard"
import Result from "./Result"

export default function Quiz() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Fetch categories
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
      .catch(err => setError("Failed to load categories"))
  }, [])

  // Fetch questions
  const startQuiz = (categoryId) => {
    setLoading(true)
    fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results)
        setQuizStarted(true)
        setLoading(false)
      })
      .catch(err => {
        setError("Failed to load questions")
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to load questions")
        setLoading(false)
      })
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>

  // Before starting quiz: category selection
  if (!quizStarted) {
    return (
      <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Quiz Category</h2>
        <div className="flex flex-col gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              className="p-2 border rounded hover:bg-blue-500 hover:text-white"
              onClick={() => {
                setSelectedCategory(cat)
                startQuiz(cat.id)
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Quiz in progress
  if (quizStarted && currentIndex < questions.length) {
    return (
      <QuestionCard
        question={questions[currentIndex]}
        onAnswer={(correct) => {
          if (correct) setScore(score + 1)
          setCurrentIndex(currentIndex + 1)
        }}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
      />
    )
  }

  // Quiz finished
  return <Result score={score} total={questions.length} />
}
