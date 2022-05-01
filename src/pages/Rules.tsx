import { Link } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getQuizData } from "../services/quizServices";
import { actionConstants } from "../reducer/actionConstants";
import { useEffect } from "react";

export const Rules = () => {
	const currQuiz: string | null = sessionStorage.getItem("currQuiz");
	const { quizDispatch } = useQuizContext();
	const { START_QUIZ } = actionConstants;
	useEffect(() => {
		(async () => {
			const quizData = await getQuizData("abc");
			console.log(quizData);
		})();
		quizDispatch({ type: START_QUIZ });
	}, []);
	const rules = [
		`Each right answer scores 10 Points`,
		`Each question has only one
right answer`,
		`Score more than 70% to win
the quiz`,
	];
	return (
		<div className="rules-container ">
			<div className="flex-column gap-m ">
				<h1 className="text-center text-l txt-high-light">Category Name</h1>
				{rules.map((rule, id) => (
					<span className="text-xs" key={id}>
						<i className="fas fa-question-circle"></i> {rule}
					</span>
				))}

				<div className="text-center">
					<Link to={`/questions/${currQuiz}`} className="btn btn-primary-solid">
						<span>Start Quiz!</span>
						<i className="fas fa-angle-double-right"></i>
					</Link>
				</div>
			</div>
		</div>
	);
};
