import styled from "styled-components";
import { useState } from "react";
import { ReactTagify } from "react-tagify";

export function OnePost(props) {
	const [loading, setLoading] = useState(true);
	const { item } = props;

	const tagStyle = {
		color: "white",
		fontWeight: 700,
		cursor: "pointer",
	};
	return (
		<>
			<Container>
				<PerfilLikes>
					<img src={item.image} alt="image" />
				</PerfilLikes>
				<LinkPostBox>
					<UserName>{item.username}</UserName>
					<ReactTagify tagStyle={tagStyle}>
						<Text>{item.text}</Text>
					</ReactTagify>
					<LinkPreview>
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
							<img src={item.linkImage} alt="image" />
						)}
					</LinkPreview>
				</LinkPostBox>
			</Container>
		</>
	);
}

const Loading = styled.div``;

const Container = styled.div`
	background-color: #222222;
	width: 611px;
	height: 100%;
	border-radius: 16px;
	margin-top: 16px;
	display: flex;
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
	margin-bottom: 12px;
`;

const Text = styled.p`
	font-size: 17px;
	font-family: "Lato";
	font-weight: 400;
	color: #b7b7b7;
	margin-bottom: 10px;
`;

const LinkPreview = styled.div`
	width: 503px;
	border: 1px solid #4d4d4d;
	border-radius: 11px;
	height: 100%;
	display: flex;
	cursor: pointer;
	img {
		width: 155px;
		height: 155px;
		border-bottom-right-radius: 12px;
		border-top-right-radius: 12px;
	}
`;

const LinkInfo = styled.div`
	width: 350px;
	padding: 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const Title = styled.p`
	font-size: 16px;
	font-family: "Lato";
	font-weight: 400;
	color: #cecece;
	margin-bottom: 8px;
`;

const Description = styled.p`
	font-size: 11px;
	font-family: "Lato";
	font-weight: 400;
	color: #9b9595;
	margin-bottom: 8px;
`;

const Link = styled.p`
	font-size: 11px;
	font-family: "Lato";
	font-weight: 400;
	color: #cecece;
`;
