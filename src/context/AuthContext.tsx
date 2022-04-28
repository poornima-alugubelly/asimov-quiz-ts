import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";
import { User as FirebaseUser } from "firebase/auth";
import { reactChildren, authContextType } from "../types";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({} as authContextType);

const useAuth = () => useContext(AuthContext);
const AuthContextProvider = ({ children }: reactChildren) => {
	const [user, setUser] = useState<FirebaseUser | null>(null);
	const [authLoading, setAuthLoading] = useState(false);
	onAuthStateChanged(auth, (currentUser) => {
		setUser(currentUser);
	});
	return (
		<AuthContext.Provider
			value={{ user, setUser, authLoading, setAuthLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { useAuth, AuthContextProvider };
