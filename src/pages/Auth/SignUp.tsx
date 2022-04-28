import "./Auth.css";
import { useNavigate, Link } from "react-router-dom";
import { FormEvent, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth } from "../../firebase-config";
import { updateProfile, User } from "firebase/auth";
import { db } from "../../firebase-config";
import { signupService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { usePwdToggler } from "../../hooks/usePwdToggler";
import { Loader } from "../../components/Loader/Loader";

export const Signup = () => {
	const [formVal, setFormVal] = useState({
		email: "",
		password: "",
		firstName: "",
		lastName: "",
	});
	const { authLoading, setAuthLoading, user } = useAuth();
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const [pwdToggle, pwdToggler] = usePwdToggler();
	const signUpHandler = async (
		e: FormEvent,
		email: string,
		password: string,
		firstName: string,
		lastName: string
	) => {
		e.preventDefault();

		try {
			const res = await signupService(email, password);
			const currUser: any = auth?.currentUser;
			await addDoc(collection(db, "users"), {
				uid: res.user.uid,
				firstName,
				lastName,
				authProvider: "local",
				email,
				quizzesAttempted: [],
				totalScore: 0,
			});

			await updateProfile(currUser, {
				displayName: `${firstName} ${lastName}`,
			});
		} catch (err: any) {
			setError(err.message);
		}
	};

	if (user) {
		setAuthLoading(true);
		setTimeout(() => {
			setAuthLoading(false);
			navigate("/");
		}, 1000);
	}

	return authLoading ? (
		<Loader />
	) : (
		<div
			className="form-page-container flex-center"
			onSubmit={(e) =>
				signUpHandler(
					e,
					formVal.email,
					formVal.password,
					formVal.firstName,
					formVal.lastName
				)
			}
		>
			<form action="" className="form-container">
				<h2 className="padding-s text-center">SIGN UP</h2>
				<div className="flex-column gap-s">
					<div>
						<label htmlFor="email-input"> Email </label>
						<input
							type="email"
							className="input"
							id="email-input"
							placeholder="Enter Email"
							required
							value={formVal.email}
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
					</div>

					<div>
						<label htmlFor="email-password" className="flex-row gap-xs">
							<span>Password</span>
							<span
								data-tooltip="Password should have atleast 8 characters "
								className="tooltip"
							>
								<i className="fas fa-question-circle"></i>
							</span>
						</label>
						<div className="input input-with-icon flex-space-between">
							<input
								type={`${pwdToggle.type}`}
								id="email-password"
								pattern="^.{8,}$"
								required
								placeholder="Enter Password"
								value={formVal.password}
								onChange={(e) =>
									setFormVal((prev) => ({ ...prev, password: e.target.value }))
								}
							/>

							<span
								className={`fas ${pwdToggle.class} pointer`}
								role="button"
								onClick={() => pwdToggler()}
							></span>
						</div>
					</div>

					<div>
						<label htmlFor="first-name"> First Name </label>
						<input
							type="text"
							className="input"
							id="first-name"
							placeholder="Enter first name"
							value={formVal.firstName}
							required
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, firstName: e.target.value }))
							}
						/>
					</div>
					<div>
						<label htmlFor="last-name"> Last Name </label>
						<input
							type="text"
							className="input"
							id="last-name"
							placeholder="Enter last name"
							value={formVal.lastName}
							required
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, lastName: e.target.value }))
							}
						/>
					</div>
					<div>
						<label htmlFor="remember-me" className="flex-row gap-xs pointer">
							<input
								type="checkbox"
								name="checkbox"
								id="remember-me"
								className="input-checkbox"
								required
							/>
							I accept all Terms & Conditions
						</label>
					</div>
					{error && <span className="text-red">{error}</span>}
					<button className="btn btn-primary-solid">Sign Up</button>
					<Link
						to="/login"
						className="text-center link-colored flex-center gap-xs"
					>
						Already have an account? <i className="fas fa-chevron-right"></i>
					</Link>
				</div>
			</form>
		</div>
	);
};
