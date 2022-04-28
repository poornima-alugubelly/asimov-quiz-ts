import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Auth/Login";
import { Signup } from "../pages/Auth/SignUp";
import { Home } from "../pages/Home";
import { Questions } from "../pages/Questions";
import { Result } from "../pages/Results";
import { Rules } from "../pages/Rules";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { LeaderBoard } from "../pages/LeaderBoard/LeaderBoard";
import { UserDetails } from "../pages/Profile/UserDetails/UserDetails";
import { UserProgress } from "../pages/Profile/UserProgress/UserProgress";
import { UserProfile } from "../pages/Profile/UserProfile";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />}></Route>
			<Route path="/" element={<ProtectedRoutes />}>
				<Route path="/rules" element={<Rules />} />
				<Route path="/questions/:quizId" element={<Questions />} />
				<Route path="/results" element={<Result />} />
				<Route path="/leaderBoard" element={<LeaderBoard />} />
				<Route path="/profile" element={<UserProfile />}>
					<Route path="/profile" element={<UserDetails />} />
					<Route path="/profile/progress" element={<UserProgress />} />
				</Route>
			</Route>

			<Route path="/login" element={<Login />}></Route>
			<Route path="/signup" element={<Signup />}></Route>
		</Routes>
	);
};
