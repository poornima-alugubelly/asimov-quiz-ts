import { User as FirebaseUser } from "firebase/auth";
export type authContextType = {
	user: FirebaseUser | null;
	setUser: React.Dispatch<React.SetStateAction<FirebaseUser | null>>;
	authLoading: boolean;
	setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
