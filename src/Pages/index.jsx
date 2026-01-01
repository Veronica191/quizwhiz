import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-700 text-white px-4">
      
      {/* Title */}
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center drop-shadow-lg">
        Welcome to QuizWhiz
      </h1>

      <p className="text-center max-w-2xl mb-8 text-xl text-blue-50 drop-shadow-md">
        Test your knowledge, track your progress, and improve with every quiz.
      </p>

    </div>
  )
}