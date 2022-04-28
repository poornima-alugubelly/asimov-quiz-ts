import { useState } from "react";
export const usePwdToggler = (): [
	{ type: string; class: string },
	() => void
] => {
	const [pwdToggle, setpwdToggle] = useState<{ type: string; class: string }>({
		type: "password",
		class: "fa-eye-slash",
	});
	const pwdToggler = () => {
		pwdToggle.type === "password"
			? setpwdToggle({ type: "text", class: "fa-eye" })
			: setpwdToggle({ type: "password", class: "fa-eye-slash" });
	};

	return [pwdToggle, pwdToggler];
};
