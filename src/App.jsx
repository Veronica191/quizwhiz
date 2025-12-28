import { Routes, Route, Navigate, useNavigate } from "react-router-dom"
import Home from "./Pages/Home"
import Quiz from "./Pages/Quiz"
import LandingPage from "./Pages/index"

function App() {
  const navigate = useNavigate()

  return (
    <Routes>
      {/* Default redirect from / to /home */}
      <Route path="/" element={<LandingPage />} />

      {/* Home page */}
      <Route path="/home" element={<Home />} />

      {/* Quiz page */}
      <Route
        path="/quiz"
        element={<Quiz onHome={() => navigate("/home")} />}
      />

      {/* Optional catch-all 404 */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
          </div>
        }
      />
    </Routes>
  )
}

export default App
