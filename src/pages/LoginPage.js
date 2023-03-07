import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { useContext, useState } from "react";
import ProjectContext from "../constants/Context";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
					id: response.id,
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
	@media (max-width: 880px) {
		flex-direction: column;
	}
`;

const StyledLeft = styled.div`
	color: #ffffff;
	background-color: #151515;
	width: calc(100vw - 545px);
	height: 100%;
	box-sizing: border-box;
	box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
	@media (max-width: 880px) {
		height: 300px;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	@media (max-width: 375px) {
		width: 375px;
		max-height: 175px;
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
		margin-left: 100px;
		margin-top: calc(50vh - 150px);
		@media (max-width: 1110px) {
			margin-left: 70px;
			font-size: 76px;
			line-height: 76px;
		}
		@media (max-width: 880px) {
			margin-left: 0px;
			margin-top: 80px;
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
		margin-left: 100px;
		width: 442px;
		height: 128px;
		@media (max-width: 1110px) {
			margin-left: 70px;
			font-size: 23px;
			line-height: 34px;
			width: 237px;
		}
		@media (max-width: 880px) {
			font-size: 23px;
			line-height: 34px;
			height: 68px;
			margin-left: 0px;
		}
	}
`;

const StyledRight = styled.div`
	width: 545px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 880px) {
		width: 100vw;
		justify-content: flex-start;
		margin-top: 30px;
	}
	@media (max-width: 375px) {
		width: 375px;
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding-left: 15px;
	padding-right: 15px;
	margin-top: 50px;
	@media (max-width: 880px) {
		margin-top: 0px;
	}

	input {
		width: 100%;
		max-width: 429px;
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

		@media (max-width: 550px) {
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
	width: 100%;
	max-width: 429px;
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

	@media (max-width: 550px) {
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

	@media (max-width: 550px) {
		font-size: 17px;
		line-height: 20.4px;
		margin-bottom: 30px;
	}
`;
