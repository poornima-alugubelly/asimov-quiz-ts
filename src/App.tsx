import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./routes/AppRoutes";
import { NavBar } from "./components/NavBar";

function App() {
	return (
		<div className="App">
			<ToastContainer theme="colored" autoClose={1000} position="bottom-left" />
			<NavBar />
			<AppRoutes />
		</div>
	);
}

export default App;
