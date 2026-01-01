import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { FiHome, FiGrid, FiHelpCircle, FiBarChart2, FiEye } from "react-icons/fi"

function Sidebar() {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const navItems = [
    { name: "Landing", path: "/", icon: <FiHome /> },
    { name: "Categories", path: "/home", icon: <FiGrid /> },
    { name: "Quiz", path: "/quiz", icon: <FiHelpCircle /> },
    { name: "Results", path: "/results", icon: <FiBarChart2 /> },
    { name: "Review", path: "/review", icon: <FiEye /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.div
      animate={{ width: isOpen ? 250 : 80 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-teal-600 to-teal-900 text-white shadow-lg z-50 flex flex-col"
    >
      {/* Header with Logo and Toggle Button */}
      <div className="flex items-center justify-between p-4 border-b border-teal-500">
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <h1 className="text-xl font-bold whitespace-nowrap">QuizWhiz</h1>
        </motion.div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-teal-700 rounded-lg transition-colors duration-200"
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 whitespace-nowrap ${
              isActive(item.path)
                ? "bg-white text-teal-700 font-semibold"
                : "hover:bg-teal-700"
            }`}
          >
            <span className="text-xl flex-shrink-0">{item.icon}</span>
            <motion.span
              animate={{ opacity: isOpen ? 1 : 0, width: isOpen ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {item.name}
            </motion.span>
          </Link>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="border-t border-teal-500 p-4">
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs text-teal-200 text-center"
        >
          {isOpen ? "Quiz Master 2025" : "QM"}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Sidebar