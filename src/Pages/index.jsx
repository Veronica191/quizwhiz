import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-600 to-white-60 text-white px-4">
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to QuizWhiz
      </h1>

      <p className="text-center max-w-xl mb-10 text-lg text-blue-100">
        Test your knowledge, track your progress, and improve with every quiz.
      </p>

    </div>
  )
}