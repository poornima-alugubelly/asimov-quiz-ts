import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

export const addScoreToUser = async (uid: string, score: number) => {
	const userDoc = doc(db, "users", uid);
	await updateDoc(userDoc, { totalScore: score });
};
