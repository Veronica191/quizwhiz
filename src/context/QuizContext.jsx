import { createContext, useReducer } from "react";

export const QuizContext = createContext();

const initialState = {
  categoryId: null,
  difficulty: null,
  questions: [],
  currentIndex: 0,
  score: 0,
  userAnswers: [],
  loading: false,
  error: "",
  quizStarted: false,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, categoryId: action.payload };

    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload };

    case "START_LOADING":
      return { ...state, loading: true, error: "" };

    case "SET_QUESTIONS":
      return {
        ...state,
        questions: action.payload,
        quizStarted: true,
        loading: false,
        currentIndex: 0,
        score: 0,
        userAnswers: [],
      };

    case "ANSWER":
      const isCorrect = action.payload.isCorrect;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        userAnswers: [...state.userAnswers, action.payload],
        currentIndex: state.currentIndex + 1,
      };

    case "ERROR":
      return { ...state, loading: false, error: action.payload };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}
