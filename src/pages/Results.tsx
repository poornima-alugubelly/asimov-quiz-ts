import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { quizDB } from "../quizDB";
import { quizOption } from "../types";

export const Result = () => {
	const {
		quizState: { currQuestion, selectedOptions },
	} = useQuizContext();
	const currQuiz = sessionStorage.getItem("currQuiz");
	const selectedQuiz = quizDB.find((quiz) => quiz.id === currQuiz);
	const questions = selectedQuiz?.questions;
	const [scores, setScores] = useState<number[]>(
		Array(questions?.length).fill(0)
	);
	const optionState = (
		quesId: number,
		optionVal: string,
		optionIsCorrect: boolean
	): string => {
		if (selectedOptions[quesId]) {
			if (optionIsCorrect) {
				return "option-correct";
			} else if (selectedOptions[quesId].value === optionVal)
				return "option-wrong";
			else return "";
		}
		return "";
	};
	const calcScore = () => {
		setScores(
			questions!.map((_, id) => (selectedOptions[id]?.isCorrect ? 10 : 0))
		);
	};

	useEffect(() => calcScore(), []);
	const totalScored = scores.reduce((acc, curr) => (acc += curr), 0);
	return currQuestion !== 0 ? (
		<div className="margin-l flex-center results">
			<div className="flex-column gap-m">
				<div className="padding-tp-btm-s">
					<h1 className="text-center text-l txt-high-light ">Quiz Result</h1>
					<h3 className="text-center text-s  ">{`You scored : ${totalScored}/${
						questions!.length * 10
					}`}</h3>
				</div>

				<section className="flex-column gap-m question-card">
					{questions?.map((questionGrp, currQuesId) => (
						<div>
							<span className="flex-space-between">
								<span>Question : {currQuesId + 1}</span>
								<span>score: {scores[currQuesId]}/10</span>
							</span>
							<p className="text-s padding-tp-btm-s">{questionGrp.question}</p>
							<div className="flex-column gap-s">
								{questionGrp.options.map((option, id) => (
									<button
										className={`btn option btn-primary-outline  ${optionState(
											currQuesId,
											option.value,
											option.isCorrect
										)}`}
										key={id}
									>
										{option.value}
									</button>
								))}
							</div>
						</div>
					))}
				</section>
			</div>
		</div>
	) : (
		<Navigate to="/" />
	);
};
