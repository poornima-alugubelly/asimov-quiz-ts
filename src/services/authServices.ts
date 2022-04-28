import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

import { auth, db } from "../firebase-config";

export const loginService = async (email: string, password: string) => {
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signupService = async (email: string, password: string) => {
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const logoutService = async () => {
	await signOut(auth);
};
