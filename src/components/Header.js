import axios from "axios";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProjectContext from "../constants/Context";
import { defaultUser } from "../constants/resetStates";
import { logoutUrl } from "../constants/urls";
import Search from "./Search";

export default function Header() {
	const { user, setUser } = useContext(ProjectContext);
	const [openedMenu, setOpenedMenu] = useState(false);
	const nav = useNavigate();
	const menuDisplay = openedMenu ? "flex" : "none";
	const [value, setValue] = useState("");
	const [result, setResult] = useState([]);
	const [showResult, setShowResult] = useState(false);

	function logout(event) {
		event.preventDefault();
		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.post(logoutUrl, {}, config)
			.then((res) => {
				console.log(res);
				setUser(defaultUser);
				nav("/");
			})
			.catch((err) => {
				console.log(err.response);
			});
	}

	return (
		<>
			<SearchDiv2>
				<Search
					value={value}
					setValue={setValue}
					result={result}
					setResult={setResult}
					showResult={showResult}
					setShowResult={setShowResult}
				/>
			</SearchDiv2>
			<StyledTop>
				<p>linkr</p>
				<SearchDiv>
					<Search
						value={value}
						setValue={setValue}
						result={result}
						setResult={setResult}
						showResult={showResult}
						setShowResult={setShowResult}
					/>
				</SearchDiv>
				<StyledTopMenu onClick={() => setOpenedMenu(!openedMenu)}>
					<IconContext.Provider
						value={{
							color: "white",
							size: "18px",
						}}
					>
						{!openedMenu ? <SlArrowUp /> : <SlArrowDown />}
					</IconContext.Provider>
					<img src={user.photo} alt="User" />
					<StyledDropDown onClick={logout} menuDisplay={menuDisplay}>
						Logout
					</StyledDropDown>
				</StyledTopMenu>
			</StyledTop>
		</>
	);
}

const StyledTop = styled.div`
	background-color: #151515;
	display: flex;
	justify-content: space-between;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	color: #ffffff;
	width: 100%;
	height: 72px;

	p {
		font-weight: 700;
		font-size: 49px;
		line-height: 54px;
		font-family: "Passion One", cursive;
		margin: 10px 0 0 28px;
	}
`;

const StyledTopMenu = styled.div`
	display: flex;
	margin-right: 17px;
	justify-content: center;
	align-items: center;
	position: relative;

	img {
		border-radius: 50%;
		border: none;
		width: 53px;
		height: 53px;
		margin-left: 16.3px;
	}
`;

const StyledDropDown = styled.div`
	position: absolute;
	color: #ffffff;
	font-size: 17px;
	line-height: 20.4px;
	font-weight: 700;
	font-family: "Lato", cursive;
	bottom: -47px;
	background-color: #151515;
	width: 133px;
	height: 47px;
	border-radius: 0 0 20px 20px;
	display: ${(props) => props.menuDisplay};
	justify-content: center;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

const SearchDiv = styled.div`
	margin-top: 13px;
	margin-left: 35px;
	margin-right: 35px;
	display: flex;
	justify-content: center;
	width: 100%;
	@media (max-width: 610px) {
		display: none;
	}
`;

const SearchDiv2 = styled.div`
	display: none;
	width: 100%;
	@media (max-width: 610px) {
		width: 100%;
		display: flex;
		justify-content: center;
		margin: 72px 0px 0px 0px;
		padding: 12px 12px 0px 12px;
	}
`;
