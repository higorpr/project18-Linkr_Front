import styled from "styled-components";
import Post from "./Post";
import { Posts } from "./Posts";
import Header from "./Header";

export default function Main() {
	return (
		<>
			<Header />
			<StyledPage>
				<StyledBody>
					<PostsBox>
						<TitlePage>timeline</TitlePage>
						{/*<Post></Post>*/}
						<Posts></Posts>
					</PostsBox>
					<TrendingBox>
						<div></div>
						{/* Insert here the code for the trending */}
					</TrendingBox>
				</StyledBody>
			</StyledPage>
		</>
	);
}

const StyledPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
`;

const StyledBody = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 72px;
	@media (max-width: 610px) {
		margin-top: 0px;
	}
`;

const TrendingBox = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 125px;
	margin-left: 30px;
	div {
		height: 100px;
		width: 200px;
		background-color: blueviolet;
	}
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
