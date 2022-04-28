import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const NavBar = () => {
	const { user } = useAuth();
	console.log(user);
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
						<span className="text-xxs pointer">Rankings </span>
					</Link>
					{user ? (
						<Link
							to="/profile"
							className="flex-column flex-align-center gap-xs"
						>
							<i className="fas fa-user btn-icon"></i>

							<span className="text-xxs pointer"> Profile</span>
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
