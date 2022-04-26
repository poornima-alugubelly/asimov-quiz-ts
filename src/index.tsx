import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QuizContextProvider } from "./context/QuizContext";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<QuizContextProvider>
				<App />
			</QuizContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
