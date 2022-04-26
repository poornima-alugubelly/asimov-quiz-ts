import { useQuizContext } from "../context/QuizContext";
import { quizDB } from "../quizDB";

export const Result = () => {
	const {
		quizState: { currQuiz, selectedOptions },
	} = useQuizContext();
	const selectedQuiz = quizDB.find((quiz) => quiz.id === currQuiz);
	const questions = selectedQuiz?.questions;

	const optionState = (
		quesId: number,
		optionId: number,
		answer: number
	): string => {
		if (selectedOptions[quesId]) {
			if (optionId === answer) return "option-correct";
			else if (selectedOptions[quesId] === optionId) return "option-wrong";
			else return "";
		}
		return "";
	};
	return (
		<div className="margin-l flex-center results">
			<div className="flex-column gap-m">
				<h1 className="text-center text-l txt-high-light padding-l">
					Score 20/20
				</h1>

				<section className="flex-column gap-m">
					{questions?.map((questionGrp, currQuesId) => (
						<div>
							<span className="flex-space-between">
								<span>Question : {currQuesId + 1}</span>
								<span>score:</span>
							</span>
							<p className="text-s padding-tp-btm-s">{questionGrp.question}</p>
							<div className="flex-column gap-s">
								{questionGrp.options.map((option, optionId) => (
									<button
										className={`btn option btn-primary-outline  ${optionState(
											currQuesId,
											optionId,
											questionGrp.answer
										)}`}
									>
										{option}
									</button>
								))}
							</div>
						</div>
					))}
				</section>
			</div>
		</div>
	);
};
