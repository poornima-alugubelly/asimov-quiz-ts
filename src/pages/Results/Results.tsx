import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useQuizContext } from "../../context/QuizContext";
import { quizDB } from "../../quizDB";
import { actionConstants } from "../../reducer/actionConstants";
import { useNavigate } from "react-router-dom";
import { updateUserService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import "./Results.css";

export const Result = () => {
	console.log("results");
	const navigate = useNavigate();
	const {
		quizState: { selectedOptions, quizStarted },
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
	const { UPDATE_USER } = actionConstants;
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

		if (
			currTotal.current !== currQuizTotal ||
			(currTotal.current === 0 && currQuizTotal === 0)
		) {
			const quizPass =
				currQuizTotal >= questions!.length * 10 * (70 / 100) ? true : false;
			quizDispatch({
				type: UPDATE_USER,
				payload: {
					addScore: currQuizTotal,
					addQuiz: selectedQuiz?.title,
					quizPass,
					quizId: selectedQuiz?.id,
				},
			});
			updateUserService(user?.uid, currQuizTotal, selectedQuiz?.title);
		}
		currTotal.current = currQuizTotal;

		setScores(
			questions!.map((_, id) => (selectedOptions[id]?.isCorrect ? 10 : 0))
		);
	};

	useEffect(() => {
		calcScore();
	}, []);
	console.log(quizStarted);
	return quizStarted ? (
		<div className="flex-center padding-s">
			<div className="flex-column gap-m">
				<div className="padding-tp-btm-s flex-column gap-xs">
					<h1 className="text-center text-l txt-high-light ">Quiz Result</h1>
					<h3 className="text-center text-s  ">{`You scored : ${
						currTotal.current
					}/${questions!.length * 10}`}</h3>
					<p className="text-center text-xs">
						{currTotal.current >= questions!.length * 10 * (70 / 100)
							? "🎉 Yayy you passed the quiz!"
							: "😔 Better luck next time"}
					</p>
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
