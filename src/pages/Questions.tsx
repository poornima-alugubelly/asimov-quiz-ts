import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { actionConstants } from "../reducer/actionConstants";
import { quizOption } from "../types";
import { quizDB } from "../quizDB";

export const Questions = () => {
	const navigate = useNavigate();
	const params = useParams();
	const quizId = params.quizId;
	const { SET_CURRQUE, SET_ANSWERS } = actionConstants;
	const selectedQuiz = quizDB.find((quiz) => quiz.id === quizId);
	const questions = selectedQuiz?.questions;

	const [selectedOption, setSelectedOption] = useState<quizOption[] | []>([]);
	const {
		quizState: { currQuestion },
		quizDispatch,
	} = useQuizContext();
	let question;
	let options;
	if (questions) {
		question = questions[currQuestion]?.question;
		options = questions[currQuestion]?.options;
	}

	const nextHandler = () => {
		quizDispatch({
			type: SET_CURRQUE,
			payload: { currQue: currQuestion + 1 },
		});
	};
	const submitHandler = () => {
		navigate("/results");
		quizDispatch({
			type: SET_ANSWERS,
			payload: { selectedOption },
		});
	};

	return (
		<div className="margin-l flex-center">
			<div className="flex-column gap-m question-card">
				<h1 className="text-center text-l txt-high-light padding-l">
					{selectedQuiz?.title}
				</h1>

				<div className="flex-space-between">
					<span>
						Question : {currQuestion + 1}/{questions?.length}
					</span>
					<span>Score: 0</span>
				</div>

				<p className="text-s">{question}</p>

				<div className="flex-column gap-s">
					{options?.map((option: quizOption, id) => (
						<button
							className={`btn option btn-primary-outline ${
								selectedOption[currQuestion]?.value === option.value
									? "option-selected"
									: ""
							}`}
							key={id}
							onClick={() => {
								selectedOption[currQuestion] = option;
								console.log(selectedOption);
								setSelectedOption([...selectedOption]);
							}}
						>
							{option.value}
						</button>
					))}
				</div>
				<div className="flex-space-between">
					<span
						className={`link-colored ${
							currQuestion === 0 ? "btn-disabled" : ""
						}`}
						onClick={() => {
							quizDispatch({
								type: SET_CURRQUE,
								payload: { currQue: currQuestion - 1 },
							});
						}}
					>
						<i className="fas fa-chevron-left"></i> Prev
					</span>
					<span
						className="link-colored"
						onClick={() => {
							currQuestion + 1 === questions?.length
								? submitHandler()
								: nextHandler();
						}}
					>
						{currQuestion + 1 === questions?.length ? "Submit" : "Next"}
						<i className="fas fa-chevron-right"></i>
					</span>
				</div>
			</div>
		</div>
	);
};
