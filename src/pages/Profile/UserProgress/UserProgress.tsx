import { useEffect, useState } from "react";
import { getProgressService } from "../../../services";
import { useAuth } from "../../../context/AuthContext";
import { attemptedQuizzes } from "../../../types";
import { Loader } from "../../../components/Loader/Loader";

export const UserProgress = () => {
	const [progress, setProgress] = useState<attemptedQuizzes[] | null>(null);
	const { user, authLoading, setAuthLoading } = useAuth();

	useEffect(() => {
		(async () => {
			setAuthLoading(true);
			const response = await getProgressService(user?.uid);
			setAuthLoading(false);

			setProgress(response);
		})();
	}, []);

	return authLoading ? (
		<Loader />
	) : (
		<div className="padding-s ">
			<h3>Quiz Attempts</h3>

			{progress?.length === 0 ? (
				<span>No quizzes attempted till now :(</span>
			) : (
				<div>
					<div className="flex-space-between padding-tp-btm-xs">
						<p>Quiz Category</p>
						<p>Your Score</p>
					</div>
					{progress?.map((quizAttempt) => (
						<div className="">
							<div className="flex-space-between padding-xs progress-item ">
								<p>{quizAttempt.quizCategory}</p>
								<div>
									<p>{quizAttempt.quizScore}</p>
									<span>{quizAttempt.quizPass ? "PASS" : "FAIL"}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
