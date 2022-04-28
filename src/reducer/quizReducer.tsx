import { quizAction, quizReducerState } from "../types";
import { actionConstants } from "./actionConstants";

export const quizReducer = (state: quizReducerState, action: quizAction) => {
	const { SET_CURRQUE, SET_ANSWERS, RESET, SET_TOTALSCORE } = actionConstants;

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

		case SET_TOTALSCORE: {
			// console.log(action.payload.addScore);
			return {
				...state,
				totalScore: state.totalScore + action.payload.addScore,
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
