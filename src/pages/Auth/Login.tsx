import "./Auth.css";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-config";
import { loginService } from "../../services";
import { useAuth } from "../../context/AuthContext";
import { usePwdToggler } from "../../hooks/usePwdToggler";
import { Loader } from "../../components/Loader/Loader";

export const Login = () => {
	const [formVal, setFormVal] = useState({ email: "", password: "" });
	const [pwdToggle, pwdToggler] = usePwdToggler();
	const [error, setError] = useState("");
	const { authLoading, setAuthLoading, user, setUser } = useAuth();
	const navigate = useNavigate();
	const location: any = useLocation();
	const from = location?.state?.from.pathname || "/";
	const loginHandler = async (
		e: FormEvent,
		email: string,
		password: string
	) => {
		setFormVal({ email, password });
		e.preventDefault();
		try {
			const response = await loginService(email, password);
			if (response) {
				const resUser: any = response?.user;
				if (resUser) {
					const q = query(
						collection(db, "users"),
						where("uid", "==", resUser.uid)
					);
					const querySnapshot1 = await getDocs(q);
					querySnapshot1.forEach((doc) => {
						const userObj: any = doc.data();
						setUser(userObj);
						localStorage.setItem("user", JSON.stringify(userObj));
					});
				}

				navigate(from, { replace: true });
			}
		} catch (err: any) {
			setError(err.message);
		}
	};
	if (user) {
		setAuthLoading(true);
		setTimeout(() => {
			setAuthLoading(false);
			navigate(from, { replace: true });
		}, 1000);
	}

	return authLoading ? (
		<Loader />
	) : (
		<div className="form-page-container flex-center">
			<form
				action=""
				className="form-container"
				onSubmit={(e) => loginHandler(e, formVal.email, formVal.password)}
			>
				<h2 className="padding-s text-center">LOGIN</h2>
				<div className="flex-column gap-s">
					<div>
						<label htmlFor="email-input"> Email </label>
						<input
							type="email"
							className="input"
							id="email-input"
							placeholder="Enter Email"
							value={formVal.email}
							required
							onChange={(e) =>
								setFormVal((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
					</div>

					<div>
						<label htmlFor="email-password"> Password </label>
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
					<div className="form-subtext flex-space-between">
						<label htmlFor="remember-me" className="flex-row gap-xs pointer">
							<input
								type="checkbox"
								name="checkbox"
								id="remember-me"
								className="input-checkbox"
							/>
							Remember-me
						</label>
						<a href="#" className="txt-high-light link-colored">
							Forgot your password?
						</a>
					</div>
					{error && <span className="text-red">{error}</span>}
					<button className="btn btn-primary-solid">Login</button>
					<button
						className="btn btn-primary-outline"
						onClick={(e) =>
							loginHandler(e, "adarshbalika@gmail.com", "adarshbalika123")
						}
					>
						Login with test credentials
					</button>
					<Link
						to="/signup"
						className="text-center link-colored flex-center gap-xs"
					>
						Create New account <i className="fas fa-chevron-right"></i>
					</Link>
				</div>
			</form>
		</div>
	);
};
