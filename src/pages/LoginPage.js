import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useState } from "react";
import ProjectContext from "../constants/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUrl } from "../constants/urls";

export default function LoginPage() {
	const { setUser } = useContext(ProjectContext);
	const [loading, setLoading] = useState(false);
	const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
	const nav = useNavigate();

	function login(event) {
		const Url = `${process.env.REACT_APP_API_BASE_URL}/login`;
		event.preventDefault();
		setLoading(true);
		const body = loginInfo;
		axios
			.post(Url, body)
			.then((res) => {
				const response = res.data;
				const user = {
					name: response.username,
					token: response.token,
					photo: response.image,
				};
				setUser(user);
				setLoading(false);
				localStorage.setItem("user", JSON.stringify(user));
				nav("/timeline");
			})
			.catch((err) => {
				const errorStatus = err.response.status;
				if (errorStatus === 404) {
					alert(err.response.data);
				}
				setLoading(false);
			});
	}

	return (
		<StyledPage>
			<StyledLeft>
				<h1>linkr</h1>
				<h2>save, share and discover the best links on the web</h2>
			</StyledLeft>
			<StyledRight>
				<StyledForm onSubmit={login}>
					<input
						type="email"
						id="email"
						placeholder="e-mail"
						value={loginInfo.email}
						onChange={(e) => {
							setLoginInfo({
								...loginInfo,
								email: e.target.value,
							});
						}}
						required
						disabled={loading}
					/>
					<input
						type="password"
						id="password"
						placeholder="password"
						value={loginInfo.password}
						onChange={(e) => {
							setLoginInfo({
								...loginInfo,
								password: e.target.value,
							});
						}}
						required
						disabled={loading}
					/>
					<StyledButton type="submit" disabled={loading}>
						{loading === true ? (
							<ThreeDots width="50" height="13" color="#ffffff" />
						) : (
							<p>Log In</p>
						)}
					</StyledButton>
				</StyledForm>
				<StyledLink to="/sign-up">
					<p>First time? Create an account!</p>
				</StyledLink>
			</StyledRight>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	@media (max-width: 375px) {
		flex-direction: column;
	}
`;

const StyledLeft = styled.div`
	color: #ffffff;
	background-color: #151515;
	width: 62.8%;
	height: 100%;
	padding: 301px 0 0 144px;
	box-sizing: border-box;
	box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

	@media (max-width: 375px) {
		width: 375px;
		max-height:175px ;
		min-height: 175px;	
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-family: "Passion One", cursive;
		font-size: 106px;
		line-height: 116px;
		font-weight: 700;
		@media (max-width: 375px) {
			font-size: 76px;
			line-height: 76px;
			margin-top: 10px;
		}
	}

	h2 {
		font-family: "Oswald", cursive;
		font-size: 43px;
		font-weight: 700;
		line-height: 63px;
		width: 442px;
		height: 128px;
		@media (max-width: 375px) {
			font-size: 23px;
			line-height: 34px;
			width: 237px;
			height: 68px;
		}
	}
`;

const StyledRight = styled.div`
	width: 375px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 317px;
	@media (max-width: 375px) {
		margin-top: 40px;
	}

	input {
		width: 429px;
		height: 65px;
		border-radius: 6px;
		border: none;
		text-indent: 17px;
		margin-bottom: 13px;
		font-size: 27px;
		line-height: 40px;
		font-weight: 700;
		font-family: "Oswald", cursive;
		&::placeholder {
			color: #9f9f9f;
		}

		@media (max-width: 375px) {
			width: 330px;
			height: 55px;
			margin-bottom: 11px;
			font-size: 22px;
			line-height: 32.6px;
		}
	}
`;

const StyledButton = styled.button`
	color: #ffffff;
	font-size: 27px;
	font-weight: 700;
	line-height: 70px;
	text-align: center;
	background-color: #1877f2;
	width: 429px;
	height: 65px;
	border-radius: 6px;
	border: none;
	margin-bottom: 22px;
	font-family: "Oswald", cursive;
	display: flex;
	justify-content: center;
	align-items: center;

	&:disabled {
		opacity: 0.7;
	}

	@media (max-width: 375px) {
		width: 330px;
		height: 55px;
		font-size: 22px;
		line-height: 32.6px;
	}
`;

const StyledLink = styled(Link)`
	color: #ffffff;
	font-family: "Lato";
	font-size: 20px;
	font-weight: 400;
	line-height: 24px;

	@media (max-width: 375px) {
		font-size: 17px;
		line-height: 20.4px;
	}
`;
