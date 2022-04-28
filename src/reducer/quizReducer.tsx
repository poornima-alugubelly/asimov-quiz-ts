import { quizAction, quizReducerState } from "../types";
import { actionConstants } from "./actionConstants";

export const quizReducer = (state: quizReducerState, action: quizAction) => {
	const { SET_CURRQUE, SET_ANSWERS, RESET, UPDATE_USER } = actionConstants;

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

		case UPDATE_USER: {
			return {
				...state,
				totalScore: state.totalScore + action.payload.addScore,
				quizzesAttempted: [
					...state.quizzesAttempted,
					{
						quizCategory: action.payload.addQuiz,
						quizScore: action.payload.addScore,
					},
				],
			};
		}
		case RESET: {
			return {
				...state,
				currQuestion: 0,
				selectedOptions: [],
			};
		}
		default:
			return state;
	}
};
