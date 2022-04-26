import { quizAction, quizReducerState } from "../types";
import { actionConstants } from "./actionConstants";

export const quizReducer = (state: quizReducerState, action: quizAction) => {
	const { SET_CURRQUIZ, SET_CURRQUE, SET_ANSWERS } = actionConstants;

	switch (action.type) {
		case SET_CURRQUIZ:
			return {
				...state,
				currQuiz: action.payload.currQuiz,
			};
		case SET_CURRQUE: {
			return {
				...state,
				currQuestion: action.payload.currQue,
			};
		}
		case SET_ANSWERS: {
			const { questionId, option } = action.payload;
			const newSelectedOptions = [...state.selectedOptions];
			newSelectedOptions[questionId] = option;
			return {
				...state,
				selectedOptions: [...newSelectedOptions],
			};
		}
		default:
			return state;
	}
};
