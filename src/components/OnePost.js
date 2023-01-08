import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useState, useContext } from "react";
import ProjectContext from "../constants/Context";
import axios from "axios";

export function OnePost(props) {
	const [disabled, setDisabled] = useState(false);
	const { item } = props;
	const navigate = useNavigate();
	const { user } = useContext(ProjectContext);
	const [selfLike, setSelfLike] = useState(item.selfLike);
	const [likes, setLikes] = useState(item.likes);

	const tagStyle = {
		color: "white",
		fontWeight: 700,
		cursor: "pointer",
	};

	function goToProfile() {
		navigate(`/user/${item.user_id}`);
	}

	function postLike() {
		const Url = `http://localhost:4000/posts/${item.id}/like`;
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		setDisabled(true);
		axios
			.post(Url, {}, config)
			.then((answer) => {
				console.log(answer);
				item.likes = answer.data.likes;
				item.selfLike = answer.data.selfLike;

				setLikes(item.likes);
				setSelfLike(item.selfLike);
				setDisabled(false);
			})
			.catch((err) => {
				console.log(err);
				setDisabled(false);
			});
	}

	function removeLike() {}

	function openLink() {
		window.open(item.link);
	}
	return (
		<>
			<Container>
				<PerfilLikes>
					<img src={item.image} alt="perfil" />
					<Likes>
						{selfLike ? (
							<IoHeartSharp
								color="#AC0000"
								onClick={removeLike}
								disabled={disabled}
							/>
						) : (
							<IoHeartOutline
								color="white"
								onClick={postLike}
								disabled={disabled}
							/>
						)}
						<h1>{likes} likes</h1>
					</Likes>
				</PerfilLikes>
				<LinkPostBox>
					<UserName onClick={goToProfile}>{item.username}</UserName>
					<ReactTagify tagStyle={tagStyle}>
						<Text>{item.text}</Text>
					</ReactTagify>
					<LinkPreview onClick={openLink}>
						<LinkInfo>
							{item?.linkTitle === undefined ? null : (
								<Title>{item?.linkTitle}</Title>
							)}
							{item?.linkDescription === undefined ? null : (
								<Description>{item?.linkDescription}</Description>
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

const Likes = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 19px;
	svg {
		color: ${(props) => props.color};
		font-size: 20px;
		cursor: pointer;
	}
	h1 {
		margin-top: 4px;
		color: white;
		font-size: 11px;
	}
	@media (max-width: 610px) {
		margin-top: 15px;
		svg {
			font-size: 17px;
		}
		h1 {
			font-size: 9px;
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
	cursor: pointer;
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
