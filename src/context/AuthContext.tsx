import { reactChildren, authContextType } from "../types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({} as authContextType);

const useAuth = () => useContext(AuthContext);
const AuthContextProvider = ({ children }: reactChildren) => {
	const localStorageUser = localStorage.getItem("user");
	const [user, setUser] = useState(
		localStorageUser ? JSON.parse(localStorageUser) : null
	);
	const [authLoading, setAuthLoading] = useState(false);
	return (
		<AuthContext.Provider
			value={{ user, setUser, authLoading, setAuthLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { useAuth, AuthContextProvider };
