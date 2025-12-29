import { Routes, Route, useNavigate } from "react-router-dom"
import Sidebar from "./Sidebar"
import Home from "../Pages/Home"
import Quiz from "../Pages/Quiz"
import LandingPage from "../Pages/index"

function Layout() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 ml-20 overflow-auto">
        <Routes>
          {/* Default landing page */}
          <Route path="/" element={<LandingPage />} />

          {/* Home page with categories */}
          <Route path="/home" element={<Home />} />

          {/* Quiz page */}
          <Route
            path="/quiz"
            element={<Quiz onHome={() => navigate("/home")} />}
          />

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default Layout
