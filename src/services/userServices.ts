import { db } from "../firebase-config";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";

export const addScoreToUser = async (
	uid: string | undefined,
	score: number
) => {
	const dbUser = collection(db, "users");
	const data = await getDocs(dbUser);
	let userDocId = "";
	data.docs.forEach((doc) => {
		if (doc.data().uid.toString() === uid) {
			userDocId = doc.id;
		}
	});
	const currUserRef = doc(db, "users", userDocId);
	await updateDoc(currUserRef, { totalScore: score });
};
