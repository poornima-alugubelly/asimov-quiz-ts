import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import "./UserProfile.css";

export const UserProfile = () => {
	const [currPage, setCurrPage] = useState<string>("Profile");

	return (
		<div className="page-container">
			<h2 className="padding-l text-center">My Profile</h2>
			<div className="flex-center">
				<div className="profile-container ">
					<div className="flex-column ">
						<ul className="profile-list">
							<li
								className={`profile-link text-center padding-m ${
									currPage === "Profile" ? "border-bottom" : ""
								}`}
							>
								<Link to="/profile" onClick={() => setCurrPage("Profile")}>
									User Details
								</Link>
							</li>

							<li
								className={`profile-link text-center padding-m ${
									currPage === "Progress" ? "border-bottom" : ""
								}`}
							>
								<Link
									to="/profile/progress"
									onClick={() => setCurrPage("Progress")}
								>
									Progress
								</Link>
							</li>
						</ul>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};
