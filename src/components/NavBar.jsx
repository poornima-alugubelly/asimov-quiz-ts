import { Link } from "react-router-dom";

export const NavBar = () => {
	return (
		<nav className="nav-bar shadow-bottom">
			<Link to="/" className="nav-bar-logo">
				AQ
			</Link>
		</nav>
	);
};
