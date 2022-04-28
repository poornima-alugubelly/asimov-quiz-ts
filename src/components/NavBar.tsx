import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutService } from "../services";
export const NavBar = () => {
	const { user } = useAuth();
	console.log(user);
	return (
		<nav className="nav-bar shadow-bottom flex-space-between">
			<Link to="/" className="nav-bar-logo">
				AQ
			</Link>
			{user ? (
				<div className="flex-column " onClick={logoutService}>
					<i className="fas fa-user btn-icon"></i>

					<span className="text-xxs pointer"> logout</span>
				</div>
			) : (
				<Link to="/login" className="flex-column ">
					<i className="fas fa-user btn-icon"></i>

					<span className="text-xxs pointer">Login </span>
				</Link>
			)}
		</nav>
	);
};
