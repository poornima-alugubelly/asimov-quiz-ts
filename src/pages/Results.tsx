import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { quizDB } from "../quizDB";
import { actionConstants } from "../reducer/actionConstants";
import { useNavigate } from "react-router-dom";
import { addScoreToUser } from "../services/userServices";
import { useAuth } from "../context/AuthContext";

export const Result = () => {
	const navigate = useNavigate();
	const {
		quizState: { currQuestion, selectedOptions, totalScore },
		quizDispatch,
	} = useQuizContext();
	const { user } = useAuth();
	const currQuiz = sessionStorage.getItem("currQuiz");
	const selectedQuiz = quizDB.find((quiz) => quiz.id === currQuiz);
	const questions = selectedQuiz?.questions;
	const [scores, setScores] = useState<number[]>(
		Array(questions?.length).fill(0)
	);
	const currTotal = useRef(0);
	const { SET_TOTALSCORE } = actionConstants;
	const optionState = (
		quesId: number,
		optionVal: string,
		optionIsCorrect: boolean
	): string => {
		if (selectedOptions[quesId]) {
			if (optionIsCorrect) {
				return "option-correct";
			} else if (selectedOptions[quesId].value === optionVal) {
				return "option-wrong";
			} else return "";
		}
		return "";
	};

	const calcScore = () => {
		let currQuizTotal = 0;
		for (let i = 0; i < questions!.length; i++)
			if (selectedOptions[i]?.isCorrect) {
				currQuizTotal += 10;
			}

		if (currTotal.current !== currQuizTotal) {
			quizDispatch({
				type: SET_TOTALSCORE,
				payload: { addScore: currQuizTotal },
			});
			addScoreToUser(user?.uid, totalScore + currQuizTotal);
		}
		currTotal.current = currQuizTotal;

		setScores(
			questions!.map((_, id) => (selectedOptions[id]?.isCorrect ? 10 : 0))
		);
	};

	useEffect(() => {
		calcScore();
	}, []);

	return currQuestion !== 0 ? (
		<div className="margin-l flex-center results">
			<div className="flex-column gap-m">
				<div className="padding-tp-btm-s">
					<h1 className="text-center text-l txt-high-light ">Quiz Result</h1>
					<h3 className="text-center text-s  ">{`You scored : ${
						currTotal.current
					}/${questions!.length * 10}`}</h3>
				</div>

				<section className="flex-column gap-m question-card">
					{questions?.map((questionGrp, currQuesId) => (
						<div key={currQuesId}>
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
				<div className="flex-center">
					<span
						role="button"
						className="btn btn-primary-solid flex-center gap-xs "
						onClick={() => navigate("/")}
					>
						<i className="fas fa-chevron-left"></i>
						<span>Go back Home</span>
					</span>
				</div>
			</div>
		</div>
	) : (
		<Navigate to="/" />
	);
};
