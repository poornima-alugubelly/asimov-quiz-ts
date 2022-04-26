import { createContext, useContext, useReducer } from "react";
import { reactChildren, quizContext } from "../types";
import { quizReducer } from "../reducer/quizReducer";

const QuizContext = createContext({} as quizContext);
const useQuizContext = () => useContext(QuizContext);
const initialState = { currQuiz: "", currQuestion: 0, selectedOptions: [] };
const QuizContextProvider = ({ children }: reactChildren) => {
	const [quizState, quizDispatch] = useReducer(quizReducer, initialState);
	return (
		<QuizContext.Provider value={{ quizState, quizDispatch }}>
			{children}
		</QuizContext.Provider>
	);
};

export { useQuizContext, QuizContextProvider };
