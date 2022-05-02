import { leaderBoardService } from "../../services";
import { useEffect, useState } from "react";
import { leaderBoard } from "../../types";
import "./LeaderBoard.css";

export const LeaderBoard = () => {
	const [leaderBoard, setLeaderBoard] = useState<leaderBoard[] | null>(null);
	useEffect(() => {
		(async () => {
			const response = await leaderBoardService();
			setLeaderBoard(response);
		})();
	}, []);

	return (
		<div className="page-container">
			<h2 className="padding-l text-center">Leader Board</h2>
			<table>
				<thead>
					<th className="padding-s">USER</th> <th>SCORE</th>
				</thead>

				{leaderBoard?.map((user) => (
					<tr>
						<td>{user.userName}</td> <td>{user.userScore}</td>
					</tr>
				))}
			</table>
		</div>
	);
};
