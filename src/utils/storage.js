// localStorage helpers for quiz data
const QUIZ_RESULT_KEY = "quizResult"
const QUIZ_HISTORY_KEY = "quizHistory"

export function saveQuizResult(result) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(QUIZ_RESULT_KEY, JSON.stringify(result))
  } catch (e) {
    console.error("Failed to save quiz result:", e)
  }
}

export function getQuizResult() {
  if (typeof window === "undefined") return null
  try {
    const result = localStorage.getItem(QUIZ_RESULT_KEY)
    return result ? JSON.parse(result) : null
  } catch (e) {
    console.error("Failed to get quiz result:", e)
    return null
  }
}

export function clearQuizResult() {
  if (typeof window === "undefined") return
  try {
    localStorage.removeItem(QUIZ_RESULT_KEY)
  } catch (e) {
    console.error("Failed to clear quiz result:", e)
  }
}

export function addToQuizHistory(result) {
  if (typeof window === "undefined") return
  try {
    const history = JSON.parse(localStorage.getItem(QUIZ_HISTORY_KEY)) || []
    history.push({ ...result, date: new Date().toLocaleDateString() })
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(history))
  } catch (e) {
    console.error("Failed to add to quiz history:", e)
  }
}

export function getQuizHistory() {
  if (typeof window === "undefined") return []
  try {
    const history = localStorage.getItem(QUIZ_HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch (e) {
    console.error("Failed to get quiz history:", e)
    return []
  }
}
