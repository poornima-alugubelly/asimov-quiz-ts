export type quizAction = {
	type: string;
	payload?: any;
};

type quizDispatch = (action: quizAction) => void;

export type quizOption = {
	value: string;
	isCorrect: boolean;
};

export type attemptedQuizzes = {
	quizCategory: string;
	quizScore: number;
};

export type quizReducerState = {
	currQuestion: number;
	selectedOptions: quizOption[];
	totalScore: number;
	quizzesAttempted: attemptedQuizzes[];
};

export type quizContext = {
	quizState: quizReducerState;
	quizDispatch: quizDispatch;
};

export type leaderBoard = {
	userName: string;
	userScore: number;
};
