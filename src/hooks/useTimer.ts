import { useEffect, useRef, useState } from "react";

export const useTimer = () => {
	const [timerSec, setTimerSec] = useState(15);
	const [timerMin, setTimerMin] = useState(0);
	const sec = useRef(15);
	const min = useRef(0);
	useEffect(() => {
		const timerId = setInterval(() => {
			sec.current -= 1;
			if (sec.current === 0 && min.current === 0) {
				clearInterval(timerId);
			} else if (sec.current === 0) {
				setTimerSec(60);
				min.current -= 1;
				setTimerMin((prev) => prev - 1);
			} else {
				setTimerSec((prev) => prev - 1);
			}
		}, 1000);

		return () => {
			clearInterval(timerId);
		};
	}, []);
	return { timerSec, timerMin, sec };
};
