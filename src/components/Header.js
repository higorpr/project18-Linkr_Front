import axios from "axios";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProjectContext from "../constants/Context";
import { defaultUser } from "../constants/resetStates";
import { logoutUrl } from "../constants/urls";

export default function Header() {

	const { user, setUser } = useContext(ProjectContext);
	const [openedMenu, setOpenedMenu] = useState(false);
	const nav = useNavigate();
	const menuDisplay = openedMenu ? "flex" : "none";

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
		<StyledTop>
			<p>linkr</p>
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
