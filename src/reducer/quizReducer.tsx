import { quizAction, quizReducerState } from "../types";
import { actionConstants } from "./actionConstants";

export const quizReducer = (state: quizReducerState, action: quizAction) => {
	const { SET_CURRQUE, SET_ANSWERS, RESET, UPDATE_USER, START_QUIZ } =
		actionConstants;

	switch (action.type) {
		case START_QUIZ: {
			return {
				...state,
				quizStarted: true,
			};
		}
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
			console.log(action.payload);
			return {
				...state,
				totalScore: state.totalScore + action.payload.addScore,
				quizzesAttempted: [
					...state.quizzesAttempted,
					{
						quizCategory: action.payload.addQuiz,
						quizScore: action.payload.addScore,
						quizPass: action.payload.quizPass,
						quizId: action.payload.quizId,
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
