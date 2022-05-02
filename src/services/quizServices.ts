import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export const getQuizData = async (id: string | null) => {
	if (id) {
		const docRef = doc(db, "quizData", id);
		const docSnap = await getDoc(docRef);
		return docSnap.data();
	}
};
