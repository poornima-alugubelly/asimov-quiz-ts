import { reactChildren, themeContextType } from "../types";
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({} as themeContextType);

const useTheme = () => useContext(ThemeContext);
const ThemeContextProvider = ({ children }: reactChildren) => {
	const [theme, setTheme] = useState(localStorage.getItem("theme"));
	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { useTheme, ThemeContextProvider };
