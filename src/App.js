import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import ProjectContext from "./constants/Context";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
	const [user, setUser] = useState({ name: "", token: "", photo: "" });

	return (
		<ProjectContext.Provider value={{ user, setUser }}>
			<BrowserRouter>
				<GlobalStyle />
				<Routes>
					<Route path="/" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
				</Routes>
			</BrowserRouter>
		</ProjectContext.Provider>
	);
}

export default App;
