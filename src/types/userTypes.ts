export type reactChildren = {
	children: React.ReactNode;
};

export type quizAction = {
	type: string;
	payload?: any;
};

type quizDispatch = (action: quizAction) => void;

export type quizContext = {
	quizState: quizReducerState;
	quizDispatch: quizDispatch;
};

export type quizOption = {
	value: string;
	isCorrect: boolean;
};

export type quizReducerState = {
	currQuestion: number;
	selectedOptions: quizOption[];
};
