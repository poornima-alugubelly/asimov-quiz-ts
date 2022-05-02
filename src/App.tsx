import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./routes/AppRoutes";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { useTheme } from "./context/ThemeContext";

function App() {
	const { theme } = useTheme();
	return (
		<div className={`App ${theme === "lightQuiz" ? "light-theme" : ""}`}>
			<div className="content">
				<ToastContainer
					theme="colored"
					autoClose={1000}
					position="bottom-left"
				/>
				<NavBar />
				<AppRoutes />
			</div>
			<Footer />
		</div>
	);
}

export default App;
