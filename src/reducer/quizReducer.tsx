import { quizAction, quizReducerState } from "../types";
import { actionConstants } from "./actionConstants";

export const quizReducer = (state: quizReducerState, action: quizAction) => {
	const { SET_CURRQUE, SET_ANSWERS, RESET } = actionConstants;

	switch (action.type) {
		case SET_CURRQUE: {
			return {
				...state,
				currQuestion: action.payload.currQue,
			};
		}
		case SET_ANSWERS: {
			return {
				...state,
				selectedOptions: [...action.payload.selectedOption],
			};
		}
		case RESET: {
			return {
				currQuiz: "",
				currQuestion: 0,
				selectedOptions: [],
			};
		}
		default:
			return state;
	}
};
