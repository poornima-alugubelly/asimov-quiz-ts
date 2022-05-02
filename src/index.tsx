import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QuizContextProvider } from "./context/QuizContext";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import App from "./App";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeContextProvider>
				<AuthContextProvider>
					<QuizContextProvider>
						<App />
					</QuizContextProvider>
				</AuthContextProvider>
			</ThemeContextProvider>
		</BrowserRouter>
	</React.StrictMode>
);
