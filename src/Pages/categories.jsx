import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { categories } from "../data/categories"
import { QuizContext } from "../context/QuizContext"
import CategoryCard from "../components/categoryCard"

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
          <CategoryCard
            key={cat.id}
            name={cat.name}
            image={cat.image}
            onClick={() => selectCategory(cat)}
          />
        ))}
      </div>
    </div>
  )
}
