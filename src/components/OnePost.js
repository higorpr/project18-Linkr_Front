import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { usersLikedUrl } from "../constants/urls";
import axios from "axios";
import ProjectContext from "../constants/Context";

export function OnePost(props) {
	const { item } = props;
	const { user } = useContext(ProjectContext);
	const postId = item.id;
	const [usersStr, setUsersStr] = useState("");
	console.log(usersStr)

	useEffect(() => {
		const url = `${usersLikedUrl}/${postId}`;
		const fetchData = async () => {
			try {
				const response = await axios.get(url);
				const userArr = response.data;
				console.log(userArr);

				if (userArr.length > 2) {
					const remainingUsers = userArr.length - 2;
					if (userArr.includes(user.name)) {
						const userLiked =
							userArr[0] === user.name ? userArr[1] : userArr[0];

						setUsersStr(
							`You, ${userLiked} and other ${remainingUsers} people liked this post`
						);
					} else {
						setUsersStr(
							`${userArr[0]}, ${userArr[1]} and other ${remainingUsers} people liked this post`
						);
					}
				} else if (userArr.length === 2) {
					if (userArr.includes(user.name)) {
						const userLiked =
							userArr[0] === user.name ? userArr[1] : userArr[0];

						setUsersStr(`You and ${userLiked} liked this post`);
					} else {
						setUsersStr(
							`${userArr[0]} and ${userArr[1]} liked this post`
						);
					}
				} else if (userArr.length === 1) {
					if (userArr.includes(user.name)) {
						setUsersStr(`You liked this post`);
					} else {
						setUsersStr(`${userArr[0]} liked this post`);
					}
				} else {
					setUsersStr("Be the first to like this post!");
				}
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	const tagStyle = {
		color: "white",
		fontWeight: 700,
		cursor: "pointer",
	};

	function openLink() {
		window.open(item.link);
	}
	return (
		<>
			<Container>
				<PerfilLikes>
					<img
						id={`tooltip-anchor-${postId}`}
						src={item.image}
						alt="perfil"
					/>
					<Tooltip
						anchorId={`tooltip-anchor-${postId}`}
						content={usersStr}
						place="bottom"
						events={["hover"]}
					/>
				</PerfilLikes>
				<LinkPostBox>
					<UserName>{item.username}</UserName>
					<ReactTagify tagStyle={tagStyle}>
						<Text>{item.text}</Text>
					</ReactTagify>
					<LinkPreview onClick={openLink}>
						<LinkInfo>
							{item?.linkTitle === undefined ? null : (
								<Title>{item?.linkTitle}</Title>
							)}
							{item?.linkDescription === undefined ? null : (
								<Description>
									{item?.linkDescription}
								</Description>
							)}
							<Link>{item?.link}</Link>
						</LinkInfo>
						{item?.linkImage === undefined ? null : (
							<img src={item.linkImage} alt="" />
						)}
					</LinkPreview>
				</LinkPostBox>
			</Container>
		</>
	);
}

const Container = styled.div`
	background-color: black;
	width: 100vw;
	max-width: 611px;
	height: 100%;
	border-radius: 16px;
	margin-top: 16px;
	display: flex;
	padding-right: 18px;
	@media (max-width: 610px) {
		border-radius: 0px;
	}
`;

const PerfilLikes = styled.div`
	width: 87px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	p {
		color: #ffffff;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-top: 17px;
	}
	@media (max-width: 610px) {
		img {
			width: 40px;
			height: 40px;
			margin-left: 15px;
			margin-right: 15px;
		}
	}
`;

const LinkPostBox = styled.div`
	width: 505px;
	margin-top: 17px;
	margin-bottom: 17px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const UserName = styled.p`
	font-size: 19px;
	font-family: "Lato";
	font-weight: 400;
	color: white;
	margin-bottom: 10px;
	@media (max-width: 610px) {
		font-size: 17px;
		margin-bottom: 8px;
	}
`;

const Text = styled.p`
	font-size: 17px;
	font-family: "Lato";
	font-weight: 400;
	color: #b7b7b7;
	margin-bottom: 12px;
	@media (max-width: 610px) {
		font-size: 15px;
		margin-bottom: 12px;
	}
`;

const LinkPreview = styled.div`
	width: 503px;
	border: 1px solid #4d4d4d;
	border-radius: 11px;
	height: 100%;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	img {
		width: 155px;
		height: 155px;
		border-bottom-right-radius: 12px;
		border-top-right-radius: 12px;
	}
	@media (max-width: 610px) {
		width: 100%;
		img {
			width: 95px;
			height: 100%;
		}
	}
`;

const LinkInfo = styled.div`
	max-width: 350px;
	width: 100%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: 610px) {
		padding: 15px;
	}
`;

const Title = styled.p`
	font-size: 16px;
	font-family: "Lato";
	font-weight: 400;
	color: #cecece;
	margin-bottom: 8px;
	@media (max-width: 610px) {
		font-size: 11px;
		margin-bottom: 6px;
	}
`;

const Description = styled.p`
	font-size: 11px;
	font-family: "Lato";
	font-weight: 400;
	color: #9b9595;
	margin-bottom: 8px;
	@media (max-width: 610px) {
		font-size: 9px;
		margin-bottom: 6px;
	}
`;

const Link = styled.p`
	font-size: 11px;
	font-family: "Lato";
	font-weight: 400;
	color: #cecece;
	@media (max-width: 610px) {
		font-size: 9px;
	}
`;
