export type reactChildren = {
	children: React.ReactNode;
};

export type quizReducerState = {
	currQuiz: string;
	currQuestion: number;
	selectedOptions: number[];
};

export type quizAction = {
	type: string;
	payload: any;
};

type quizDispatch = (action: quizAction) => void;

export type quizContext = {
	quizState: quizReducerState;
	quizDispatch: quizDispatch;
};
