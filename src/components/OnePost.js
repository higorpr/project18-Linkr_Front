import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export function OnePost(props) {
	const { item } = props;
	const navigate = useNavigate();

	const tagStyle = {
		color: "white",
		fontWeight: 700,
		cursor: "pointer",
	};

	function goToProfile() {
		navigate(`/user/${item.id}`);
	}

	function openLink() {
		window.open(item.link);
	}
	return (
		<>
			<Container>
				<PerfilLikes>
					<img src={item.image} alt="perfil" />
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
