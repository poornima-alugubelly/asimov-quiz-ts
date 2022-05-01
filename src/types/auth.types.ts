export type userType = {
	email: string;
	firstName: string;
	lastName: string;
	uid: string;
	quizzesAttempted: any;
	totalScore: number;
} | null;

export type authContextType = {
	user: userType;
	setUser: (arg0: userType) => void;
	authLoading: boolean;
	setAuthLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
