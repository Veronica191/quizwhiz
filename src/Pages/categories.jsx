import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { categories } from "../data/categories"
import { QuizContext } from "../context/QuizContext"

export default function Categories() {
  const navigate = useNavigate()
  const { dispatch } = useContext(QuizContext)

  function selectCategory(category) {
    dispatch({ type: "SET_CATEGORY", payload: category })
    navigate("/quiz")
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Select a Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map(cat => (
          <div
            key={cat.id}
            onClick={() => selectCategory(cat)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-40 w-full object-cover group-hover:scale-105 transition"
            />

            <div className="p-4 text-center">
              <h3 className="font-semibold text-lg">
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
