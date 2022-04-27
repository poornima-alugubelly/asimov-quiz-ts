import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Questions } from "../pages/Questions";
import { Result } from "../pages/Results";
import { Rules } from "../pages/Rules";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/rules" element={<Rules />}></Route>
			<Route path="/questions/:quizId" element={<Questions />}></Route>
			<Route path="/results" element={<Result />}></Route>
		</Routes>
	);
};
