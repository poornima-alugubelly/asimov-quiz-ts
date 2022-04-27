import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizContext } from "../context/QuizContext";
import { actionConstants } from "../reducer/actionConstants";
export const Home = () => {
	const navigate = useNavigate();
	const { quizDispatch } = useQuizContext();
	const { SET_CURRQUIZ, RESET } = actionConstants;
	useEffect(() => quizDispatch({ type: RESET }), []);

	return (
		<div className="page-container">
			<h1 className="text-center text-l txt-high-light padding-l">ASIMOV-Q</h1>
			<div className="card-layout">
				<div className="card card-vertical card-shadow-dark pointer">
					<div className="img-container">
						<img
							src="/assets/tokyoreven.jpg"
							alt="tokyo revengers show"
							className="img-responsive"
						/>
					</div>

					<div className="card-content padding-s">
						<h2 className="card-title">Anime & Manga</h2>

						<span>From Ghost in the shell to Tokyo revengers</span>
						<div className="card-footer">
							<button
								className="btn btn-primary-solid"
								onClick={() => {
									navigate("/rules");
									sessionStorage.setItem("currQuiz", "1");
								}}
							>
								<span>Take the Quiz</span>
								<i className="fa-fw fas fa-pencil-ruler"></i>
							</button>
						</div>
					</div>
				</div>

				<div className="card-layout">
					<div className="card card-vertical card-shadow-dark pointer">
						<div className="img-container">
							<img
								src="/assets/ffa.jpg"
								alt="flowersforalgernon book"
								className="img-responsive"
							/>
						</div>

						<div className="card-content padding-s">
							<h2 className="card-title">Books</h2>

							<span>
								Asimov, Herbert , Wells and Ursala are all familiar names
							</span>
							<div className="card-footer">
								<a href="./public/rules.html" className="btn btn-primary-solid">
									<span>Take the Quiz</span>
									<i className="fa-fw fas fa-book"></i>
								</a>
							</div>
						</div>
					</div>
				</div>

				<div className="card-layout">
					<div className="card card-vertical card-shadow-dark pointer">
						<div className="img-container">
							<img
								src="/assets/interstellar.jpg"
								alt="interstellar movie"
								className="img-responsive"
							/>
						</div>

						<div className="card-content padding-s">
							<h2 className="card-title">Movies</h2>

							<span>Red Pill or Blue Pill? Dream or reality?</span>
							<div className="card-footer">
								<a href="./public/rules.html" className="btn btn-primary-solid">
									<span>Take the Quiz</span>
									<i className="fa-fw fas fa-video"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="card-layout">
					<div className="card card-vertical card-shadow-dark pointer">
						<div className="img-container">
							<img
								src="/assets/darkseries.jpg"
								alt="dark series"
								className="img-responsive"
							/>
						</div>

						<div className="card-content padding-s">
							<h2 className="card-title">TV series</h2>

							<span>Have you watched enough? Let's find out</span>
							<div className="card-footer">
								<a href="./public/rules.html" className="btn btn-primary-solid">
									<span>Take the Quiz</span>
									<i className="fa-fw fas fa-tv"></i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
