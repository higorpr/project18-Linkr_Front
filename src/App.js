import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import ProjectContext from "./constants/Context";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Main from "./pages/Main";

function App() {
	const [user, setUser] = useState({ name: "", token: "", photo: "" });

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("user"));
		if (token) {
			setUser({
				name: token.name,
				token: token.token,
				photo: token.photo,
			});
		}
	}, []);

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