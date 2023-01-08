import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import ProjectContext from "./constants/Context";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUp from "./Components/SignUp";
import Main from "./pages/Main";
import HashtagPage from "./pages/HashtagPage";
import { TooltipProvider } from "react-tooltip";

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
		<TooltipProvider>
			<ProjectContext.Provider value={{ user, setUser }}>
				<BrowserRouter>
					<GlobalStyle />
					<Routes>
						<Route path="/" element={<LoginPage />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/timeline" element={<Main />} />
						<Route
							path="/hashtag/:hashtag"
							element={<HashtagPage />}
						/>
					</Routes>
				</BrowserRouter>
			</ProjectContext.Provider>
		</TooltipProvider>
	);
}

export default App;
