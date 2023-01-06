import styled from "styled-components";
import Post from "./Post";
import { Posts } from "./Posts";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import axios from "axios";
import ProjectContext from "../constants/Context";
import { logoutUrl } from "../constants/urls";
import { useNavigate } from "react-router";
import { defaultUser } from "../constants/resetStates";

export default function Main() {
	const [openedMenu, setOpenedMenu] = useState(false);
	const { user, setUser } = useContext(ProjectContext);
	const nav = useNavigate();
	console.log(user);
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
		<StyledPage>
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
			<StyledBody>
				<PostsBox>
					<TitlePage>timeline</TitlePage>
					<Post></Post>
					<Posts></Posts>
				</PostsBox>
				<TrendingBox>{/* Insert here the code for the trending */}</TrendingBox>
			</StyledBody>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	width: 100%;
	height: 100%;
`;

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

const StyledBody = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 72px;
`;

const TrendingBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 125px;
	@media (max-width: 937px) {
		display: none;
	}
`;

const PostsBox = styled.div`
	display: flex;
	flex-direction: column;
`;

const TitlePage = styled.p`
	color: white;
	font-family: "Oswald";
	font-size: 43px;
	font-weight: 700;
	margin-top: 53px;
	margin-bottom: 43px;
	@media (max-width: 610px) {
		margin: 17px;
		margin-top: 17px;
		margin-bottom: 17px;
		font-size: 33px;
	}
`;
