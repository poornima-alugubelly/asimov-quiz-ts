export type quizAction = {
	type: string;
	payload?: any;
};

type quizDispatch = (action: quizAction) => void;

export type quizOption = {
	value: string;
	isCorrect: boolean;
};

export type quizReducerState = {
	currQuestion: number;
	selectedOptions: quizOption[];
	totalScore: number;
};

export type quizContext = {
	quizState: quizReducerState;
	quizDispatch: quizDispatch;
};
