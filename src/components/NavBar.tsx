import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export const NavBar = () => {
	const { user } = useAuth();
	const { theme, setTheme } = useTheme();
	return (
		<nav className="nav-bar shadow-bottom flex-space-between ">
			<Link to="/" className="nav-bar-logo">
				AQ
			</Link>
			<div>
				<ul className="flex-row gap-s flex-center">
					<Link
						to="/leaderBoard"
						className="flex-column flex-align-center gap-xs"
					>
						<i className="fas fa-trophy btn-icon "></i>
					</Link>
					<div>
						{theme === "lightQuiz" ? (
							<div className="flex-column flex-align-center gap-xs">
								<i
									className="far fa-moon btn-icon"
									onClick={() => {
										setTheme("");
										localStorage.setItem("theme", "");
									}}
								></i>
							</div>
						) : (
							<i
								className="far fa-sun btn-icon"
								onClick={() => {
									setTheme("lightQuiz");
									localStorage.setItem("theme", "lightQuiz");
								}}
							></i>
						)}
					</div>

					{user ? (
						<Link
							to="/profile"
							className="flex-column flex-align-center gap-xs"
						>
							<i className="fas fa-user btn-icon"></i>
						</Link>
					) : (
						<Link to="/login" className="flex-column flex-align-center gap-xs">
							<i className="fas fa-user btn-icon"></i>

							<span className="text-xxs pointer">Login </span>
						</Link>
					)}
				</ul>
			</div>
		</nav>
	);
};
