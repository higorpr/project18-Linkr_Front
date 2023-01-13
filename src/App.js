import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import ProjectContext from "./constants/Context";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import Main from "./pages/Main";
import HashtagPage from "./pages/HashtagPage";
import { TooltipProvider } from "react-tooltip";
import UserPage from "./pages/UserPage";

function App() {
	const [user, setUser] = useState({ name: "", token: "", photo: "", id: 0 });
	const [numberReloads, setNumberReloads] = useState(0);

	useEffect(() => {
		const token = JSON.parse(localStorage.getItem("user"));
		if (token) {
			setUser({
				name: token.name,
				token: token.token,
				photo: token.photo,
				id: token.id,
			});
		}
	}, []);

	return (
		<TooltipProvider>
			<ProjectContext.Provider
				value={{
					user,
					setUser,
					numberReloads,
					setNumberReloads,
				}}
			>
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
						<Route path="/user/:id" element={<UserPage />} />
					</Routes>
				</BrowserRouter>
			</ProjectContext.Provider>
		</TooltipProvider>
	);
}

export default App;

