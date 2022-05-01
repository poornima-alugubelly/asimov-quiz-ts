import { useAuth } from "../../../context/AuthContext";
import { logoutService } from "../../../services";
import { auth } from "../../../firebase-config";
export const UserDetails = () => {
	const { setUser, user } = useAuth();
	return (
		<div className="padding-s ">
			<h3>Profile Details</h3>
			<div className="profile-details">
				<div className="flex-space-between padding-tp-btm-xs">
					<p>Full Name</p>
					<p>{`${user?.firstName} ${user?.lastName}`}</p>
				</div>
				<div className="flex-space-between padding-tp-btm-xs">
					<p>Email</p>
					<p>{user?.email}</p>
				</div>
				<button
					className="btn btn-primary-solid margin-tp-btm-s"
					onClick={() => {
						localStorage.removeItem("user");
						setUser(null);
						logoutService();
					}}
				>
					Log out
				</button>
			</div>
		</div>
	);
};
