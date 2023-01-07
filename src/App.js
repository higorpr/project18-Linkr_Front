import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import ProjectContext from "./constants/Context";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUp from "./Components/SignUp";
import Main from "./components/Main";

function App() {
	const [user, setUser] = useState({ name: "", token: "", photo: "" });

	return (
		<ProjectContext.Provider value={{ user, setUser }}>
			<BrowserRouter>
				<GlobalStyle />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/timeline" element={<Main />} />
				</Routes>
			</BrowserRouter>
		</ProjectContext.Provider>
	);
}

export default App;