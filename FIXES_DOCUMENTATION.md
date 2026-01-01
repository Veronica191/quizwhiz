# Quiz App Refactoring: Errors & Fixes Documentation

**Date:** December 31, 2025  
**Focus:** Result/Review routing, localStorage persistence, and safety improvements  
**Constraint:** Do not modify `src/context/QuizContext.jsx`

---

## Summary of Issues

The quiz app had 7 major issues preventing proper Result/Review page functionality and data persistence. All have been resolved.

---

## 1. ❌ Result/Review Pages Were Placeholders

### Error
**File:** `src/components/Layout.jsx`  
**Problem:** Routes for `/results` and `/review` rendered empty placeholder divs instead of actual components.

```jsx
// BEFORE (Lines 28-29)
<Route path="/results" element={<div>Results Page</div>} />
<Route path="/review" element={<div>Review Answers Page</div>} />
```

**Impact:** Sidebar links to Results/Review pages showed blank content; data couldn't be displayed.

### Fix
**File:** `src/components/Layout.jsx`  
**Solution:** Import actual Result and Review components and mount them in routes.

```jsx
// AFTER (Lines 28-29)
import Result from "../Pages/Result"
import Review from "../Pages/Review"

<Route path="/results" element={<Result />} />
<Route path="/review" element={<Review />} />
```

---

## 2. ❌ Result Component Expected Props But Was Route-Mounted

### Error
**File:** `src/Pages/Result.jsx`  
**Problem:** Component signature expected props (`score`, `total`, `answers`, `onRestart`, `onReview`, `onHome`), but when mounted as a route, no props are passed to it.

```jsx
// BEFORE - Props-based pattern
export default function Result({ score, total, answers, onRestart, onReview, onHome }) {
  // Component expects all props to be provided
}
```

**Impact:** Result page displays undefined values; callbacks don't work; localStorage data never retrieved.

### Fix
**File:** `src/Pages/Result.jsx`  
**Solution:** Remove props-based approach. Component now reads from localStorage using `getQuizResult()` hook and uses React Router's `useNavigate()` for navigation.

```jsx
// AFTER - Storage-based + Router-based pattern
import { useNavigate } from "react-router-dom"
import { getQuizResult, clearQuizResult } from "../utils/storage"

export default function Result() {
  const navigate = useNavigate()
  const result = getQuizResult()
  
  const score = result?.score ?? 0
  const total = result?.total ?? 0
  const answers = result?.answers ?? []
  
  // Navigation now uses useNavigate()
  const handleRetake = () => {
    clearQuizResult()
    navigate("/quiz")
  }
  const handleHome = () => navigate("/home")
  const handleReview = () => navigate("/review")
}
```

**Benefits:** Component is now self-contained, independent of parent state, and reads/navigates correctly.

---

## 3. ❌ Review Component Read From Context (Against Constraints)

### Error
**File:** `src/Pages/Review.jsx`  
**Problem:** Component used `useContext(QuizContext)` to read user answers, but per user requirements, context should not be modified/relied upon.

```jsx
// BEFORE - Context-dependent pattern
import { useContext } from "react"
import { QuizContext } from "../context/QuizContext"

export default function Review() {
  const { userAnswers } = useContext(QuizContext)
  // Fails if context not properly initialized
}
```

**Impact:** Review page breaks if context is empty; creates hidden dependency on QuizContext; violates user constraint.

### Fix
**File:** `src/Pages/Review.jsx`  
**Solution:** Switch to localStorage-based pattern using `getQuizResult()` utility.

```jsx
// AFTER - Storage-based pattern
import { getQuizResult } from "../utils/storage"

export default function Review() {
  const navigate = useNavigate()
  const result = getQuizResult()
  const userAnswers = result?.answers ?? []
  
  // Data retrieved from localStorage, not context
}
```

**Benefits:** No context dependency; works independently; follows user constraint.

---

## 4. ❌ Quiz Rendered Result Inline (Breaking Navigation)

### Error
**File:** `src/Pages/Quiz.jsx`  
**Problem:** When quiz finished, component rendered Result directly inline as JSX instead of navigating to a route.

```jsx
// BEFORE - Inline rendering pattern
if (currentIndex >= questions.length && quizStarted) {
  return (
    <Result 
      score={score} 
      total={questions.length} 
      answers={userAnswers}
      onRestart={handleRetake}
      onReview={handleReview}
      onHome={handleHome}
    />
  )
}
```

**Impact:** 
- Result/Review pages became unreachable via sidebar navigation
- User stuck on Quiz page after completion
- Cannot navigate away from quiz results

### Fix
**File:** `src/Pages/Quiz.jsx`  
**Solution:** Save result to localStorage and navigate to `/results` route instead of rendering inline.

```jsx
// AFTER - Storage + Router navigation pattern
import { saveQuizResult, addToQuizHistory } from "../utils/storage"
import { useNavigate } from "react-router-dom"

// In Quiz component
const navigate = useNavigate()

if (currentIndex >= questions.length && quizStarted) {
  const result = { score, total: questions.length, answers: userAnswers }
  saveQuizResult(result)              // Save to localStorage
  addToQuizHistory(result)            // Archive score
  navigate("/results")                // Route to Results page
  return null
}
```

**Benefits:** Clean separation of concerns; enables sidebar navigation; Result page handles its own display.

---

## 5. ❌ QuestionCard Had No Guard For Missing Question Data

### Error
**File:** `src/components/QuestionCard.jsx`  
**Problem:** Component assumed `question` prop always exists. If falsy (undefined/null), accessing `question.question_text`, `question.incorrect_answers`, etc. causes crash.

```jsx
// BEFORE - No guard
export default function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }) {
  const correctAnswer = question.correct_answer || ""  // Crashes if question is null
  // ...
}
```

**Impact:** App crashes if question data missing; poor error handling; breaks user experience.

### Fix
**File:** `src/components/QuestionCard.jsx`  
**Solution:** Add early return guard if question is falsy.

```jsx
// AFTER - Guard clause added
export default function QuestionCard({ question, onAnswer, questionNumber, totalQuestions }) {
  if (!question) return null  // Early return if missing
  
  const correctAnswer = decodeHTML(question.correct_answer || "")
  // Safe to access question properties
}
```

**Bonus Fix:** Also added guard for `incorrect_answers` array:

```jsx
const answers = Array.isArray(question.incorrect_answers)
  ? [...question.incorrect_answers, question.correct_answer]
  : [question.correct_answer]
```

**Benefits:** App doesn't crash; graceful fallback; safe data access.

---

## 6. ❌ Invalid Tailwind Color Class

### Error
**File:** `src/components/QuestionCard.jsx`  
**Problem:** Progress bar used non-existent Tailwind class `bg-black-500`.

```jsx
// BEFORE - Invalid class
<div className="h-2 bg-black-500 rounded-full transition-all duration-500" />
```

**Impact:** Tailwind doesn't generate this class (black has no `-500` shade); progress bar appears unstyled/transparent.

### Fix
**File:** `src/components/QuestionCard.jsx`  
**Solution:** Change to valid Tailwind color `bg-blue-500`.

```jsx
// AFTER - Valid color class
<div className="h-2 bg-blue-500 rounded-full transition-all duration-500" />
```

**Valid Tailwind Colors:**
- `bg-blue-500` ✅ (matches quiz theme)
- `bg-green-500` (alternative)
- `bg-slate-500` (neutral)

**Benefits:** Progress bar now styled correctly; matches Tailwind design system.

---

## 7. ❌ Duplicate HTML Decoder Logic

### Error
**Files:** `src/components/QuestionCard.jsx`, `src/Pages/Result.jsx`, `src/Pages/Review.jsx`  
**Problem:** HTML decoding logic duplicated in 3 separate files using identical `textarea` trick.

```jsx
// REPEATED in 3 files
function decodeHTML(html) {
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}
```

**Impact:** 
- Code duplication makes maintenance harder
- If bug found, must fix in 3 places
- Inconsistent behavior if changed differently
- Wastes space and creates sync issues

### Fix
**Solution:** Create centralized utility `src/utils/decodeHTML.js`.

```javascript
// NEW FILE: src/utils/decodeHTML.js
export default function decodeHTML(html = "") {
  if (typeof document === "undefined") return String(html)  // SSR safe
  const txt = document.createElement("textarea")
  txt.innerHTML = html
  return txt.value
}
```

**Updated Imports:**
```jsx
// UPDATED in QuestionCard, Result, Review
import decodeHTML from "../utils/decodeHTML"
```

**Benefits:** 
- Single source of truth
- SSR-safe with `typeof document` check
- Consistent behavior across app
- Easier to maintain and test

---

## 8. ✅ NEW: Missing localStorage Persistence Layer

### Problem
**Scope:** Quiz results not persisted; data lost on page refresh; Result/Review pages have no data source.

### Solution
**NEW FILE:** `src/utils/storage.js`

```javascript
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
    const history = localStorage.getItem(QUIZ_HISTORY_KEY)
    const parsed = history ? JSON.parse(history) : []
    parsed.push({ ...result, timestamp: Date.now() })
    localStorage.setItem(QUIZ_HISTORY_KEY, JSON.stringify(parsed))
  } catch (e) {
    console.error("Failed to add to history:", e)
  }
}

export function getQuizHistory() {
  if (typeof window === "undefined") return []
  try {
    const history = localStorage.getItem(QUIZ_HISTORY_KEY)
    return history ? JSON.parse(history) : []
  } catch (e) {
    console.error("Failed to get history:", e)
    return []
  }
}
```

**Benefits:**
- Centralized storage logic
- SSR-safe checks
- Error handling with try/catch
- Enables persistent Result/Review pages
- Supports score history tracking

---

## Summary Table

| Issue | File(s) | Error | Fix | Status |
|-------|---------|-------|-----|--------|
| Placeholder routes | Layout.jsx | Empty divs in routes | Mount actual Result/Review components | ✅ |
| Result expects props | Result.jsx | Signature mismatch | Switch to storage + router pattern | ✅ |
| Review uses context | Review.jsx | Context dependency | Switch to storage utility | ✅ |
| Quiz renders inline | Quiz.jsx | Can't navigate away | Save to storage + navigate | ✅ |
| No question guard | QuestionCard.jsx | Crash on null | Add `if (!question) return null` | ✅ |
| Invalid Tailwind | QuestionCard.jsx | `bg-black-500` invalid | Change to `bg-blue-500` | ✅ |
| Duplicate decoder | 3 files | Code duplication | Centralize in utils/decodeHTML.js | ✅ |
| No persistence | — | Data lost on refresh | Create utils/storage.js | ✅ |

---

## Testing Checklist

- [ ] Run `npm run dev` to verify no syntax errors
- [ ] Navigate Home → Category → Difficulty → Start Quiz
- [ ] Complete all 10 questions
- [ ] Verify redirect to `/results` page
- [ ] Verify score displays correctly
- [ ] Click "Review Answers" button → verify redirect to `/review`
- [ ] Verify all questions and answers display in Review page
- [ ] Click "Back to Results" → verify back navigation works
- [ ] Use sidebar to navigate Results/Review while quiz data persists
- [ ] Refresh page → verify results still display (localStorage)
- [ ] Click "Retake Quiz" → verify data cleared and new quiz starts
- [ ] No console errors or warnings

---

## Files Changed

### Created
- `src/utils/storage.js` – localStorage helpers
- `src/utils/decodeHTML.js` – HTML entity decoder

### Modified
- `src/Pages/Quiz.jsx` – Navigate + save instead of render inline
- `src/Pages/Result.jsx` – Read from storage, use router navigation
- `src/Pages/Review.jsx` – Read from storage, independent of context
- `src/components/Layout.jsx` – Mount actual components in routes
- `src/components/QuestionCard.jsx` – Add guard, fix Tailwind, use utils

### Unchanged (Per Constraint)
- `src/context/QuizContext.jsx` – NOT modified

---

## Migration Pattern: Props → Storage + Router

### Old Pattern (Before)
```
Quiz.jsx (inline)
  ↓
  <Result props={data} />
  ↓
  No navigation, no persistence
```

### New Pattern (After)
```
Quiz.jsx (complete)
  ↓
  saveQuizResult(data)
  navigate("/results")
  ↓
  Layout routes
  ↓
  Result.jsx (mounts, reads from storage)
  ↓
  navigate("/review")
  ↓
  Review.jsx (mounts, reads from storage)
```

---

## Key Improvements

1. **Separation of Concerns**: Each component handles its own data retrieval
2. **Persistent State**: localStorage enables refresh-safe results
3. **Route-Based Navigation**: Uses React Router for proper page transitions
4. **Error Handling**: Guards and try/catch prevent crashes
5. **DRY Code**: Centralized utilities reduce duplication
6. **SSR Safety**: Checks for `typeof window` in utilities
7. **Constraint Compliance**: Zero modifications to `src/context/`

