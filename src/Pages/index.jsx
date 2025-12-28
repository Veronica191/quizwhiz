import { useNavigate } from "react-router-dom"

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-600 to-blue-700 text-white px-4">
      
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome to QuizWhiz
      </h1>

      <p className="text-center max-w-xl mb-10 text-lg text-blue-100">
        Test your knowledge, track your progress, and improve with every quiz.
      </p>

      {/* Buttons */}
      <div className="flex flex-row justify-center items-center gap-5 w-full max-w-md">
        
        <button
          onClick={() => navigate("/home")}
          className="bg-white text-blue-700 font-semibold p-3 rounded-xl shadow-lg hover:bg-blue-100 transition"
        >
          🎯 Take Quiz
        </button>
      </div>

      {/* Footer */}
      <p className="mt-12 text-sm text-blue-200">
        © {new Date().getFullYear()} QuizMaster. All rights reserved.
      </p>
    </div>
  )
}
