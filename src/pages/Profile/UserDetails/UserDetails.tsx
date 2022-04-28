import { useAuth } from "../../../context/AuthContext";
import { logoutService } from "../../../services";

export const UserDetails = () => {
	const { user } = useAuth();
	return (
		<div className="padding-s ">
			<h3>Profile Details</h3>
			<div className="profile-details">
				<div className="flex-space-between padding-tp-btm-xs">
					<p>Full Name</p>
					<p>{user?.displayName}</p>
				</div>
				<div className="flex-space-between padding-tp-btm-xs">
					<p>Email</p>
					<p>{user?.email}</p>
				</div>
				<button
					className="btn btn-primary-solid margin-tp-btm-s"
					onClick={() => logoutService()}
				>
					Log out
				</button>
			</div>
		</div>
	);
};
