import { Link } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";

export const Rules = () => {
	const {
		quizState: { currQuiz },
	} = useQuizContext();

	return (
		<div className="margin-l flex-center">
			<div className="flex-column gap-m">
				<h1 className="text-center text-l txt-high-light">Category Name</h1>

				<span className="text-s">
					<i className="fas fa-question-circle"></i> Each right answer scores 10
					Points
				</span>
				<span className="text-s">
					<i className="fas fa-question-circle"></i> Each question has only one
					right answer
				</span>
				<span className="text-s">
					<i className="fas fa-question-circle"></i> Score more than 70% to win
					the quiz
				</span>
				<Link to={`/questions/${currQuiz}`} className="btn btn-primary-solid">
					<span>Start Quiz!</span>
					<i className="fas fa-angle-double-right"></i>
				</Link>
			</div>
		</div>
	);
};
