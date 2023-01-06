import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./theme/globalStyles";
import ProjectContext from "./constants/Context";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

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
					<Route path="/sign-up" element={<SignupPage />} />
					<Route path="/timeline" element={
						<div>
							<h1 style={{ color: "white", textAlign: "center", fontSize: "50px" }}>Timeline</h1>
							<img style={{ width: "100px", height: "100px", borderRadius: "50%", display: "block", margin: "0 auto", marginTop: "60px" }} src={user.photo} alt="user" />
							<h2 style={{ color: "white", textAlign: "center", fontSize: "30px", marginTop: "30px" }}>Welcome, {user.name}!</h2>
							<h3 style={{ color: "red", textAlign: "center", fontSize: "20px", marginTop: "30px" }}>Your token is: {user.token}</h3>
						</div>
					} />
				</Routes>
			</BrowserRouter>
		</ProjectContext.Provider>
	);
}

export default App;