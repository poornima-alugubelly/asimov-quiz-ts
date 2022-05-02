import { db } from "../firebase-config";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { attemptedQuizzes, leaderBoard } from "../types";

export const updateUserService = async (
	uid: string | undefined,
	currScore: number,
	currQuiz: string | undefined
) => {
	const dbUser = collection(db, "users");
	const data = await getDocs(dbUser);
	let userDocId: string = "";
	let userData: any = [];
	data.docs.forEach((doc) => {
		if (doc.data().uid.toString() === uid) {
			userData = doc.data();
			userDocId = doc.id;
		}
	});
	const currUserRef = doc(db, "users", userDocId);
	await updateDoc(currUserRef, {
		totalScore: currScore + userData.totalScore,
		quizzesAttempted: [
			...userData.quizzesAttempted,
			{ quizCategory: currQuiz, quizScore: currScore },
		],
	});
};

export const getProgressService = async (uid: string | undefined) => {
	const dbUser = collection(db, "users");
	const data = await getDocs(dbUser);
	let userAttemptedQuizzes: attemptedQuizzes[] = [];
	data.docs.forEach((doc) => {
		if (doc.data().uid.toString() === uid) {
			userAttemptedQuizzes = doc.data().quizzesAttempted;
		}
	});
	return userAttemptedQuizzes;
};

export const leaderBoardService = async () => {
	const dbUser = collection(db, "users");
	const data = await getDocs(dbUser);
	let leaderBoardDisplay: leaderBoard[] = data.docs.map((doc) => ({
		userName: `${doc.data().firstName} ${doc.data().lastName}`,
		userScore: doc.data().totalScore,
	}));
	leaderBoardDisplay.sort(
		(entry1: leaderBoard, entry2: leaderBoard) =>
			entry2.userScore - entry1.userScore
	);
	return leaderBoardDisplay;
};
