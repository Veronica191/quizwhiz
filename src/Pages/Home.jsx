// Home.jsx
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

export default function Home() {
  const [categories, setCategories] = useState([])
  const [scores, setScores] = useState([])
  const navigate = useNavigate()

  // Fetch quiz categories from API
  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then(res => res.json())
      .then(data => setCategories(data.trivia_categories))
      .catch(() => console.error("Failed to load categories"))
  }, [])

  // Load past quiz scores from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("quizHistory")) || []
    setScores(history)
  }, [])

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-white"> My Quiz App</h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        {categories.length === 0 ? (
          <p className="text-center col-span-full text-slate-500">
            Loading categories...
          </p>
        ) : (
          categories.map(cat => (
            <motion.button
              key={cat.id}
              onClick={() => navigate("/quiz", { state: { categoryId: cat.id } })}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow rounded-xl p-4 hover:bg-blue-500 hover:text-white transition font-semibold"
            >
              {cat.name}
            </motion.button>
          ))
        )}
      </div>

      {/* Past Scores */}
      {/* {scores.length > 0 && (
        <div className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-center">Past Scores</h2>
          <ul className="space-y-2">
            {scores
              .slice() // copy to avoid mutating original array
              .reverse() // show latest first
              .map((item, index) => (
                <li
                  key={index}
                  className="p-3 bg-white shadow rounded flex justify-between"
                >
                  <span>{item.date}</span>
                  <span>
                    {item.score} / {item.total}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )} */}
    </div>
  )
}