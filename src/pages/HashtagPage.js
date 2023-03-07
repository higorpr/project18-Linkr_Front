import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HashtagPosts } from "../components/HashtagPosts";
import Header from "../components/Header";
import TrendingBox from "../components/TrendingBox";
import { useState } from "react";

export default function HashtagPage() {
	const [lastPost, setLastPost] = useState(null);
	const [firstPost, setFirstPost] = useState(null);
	const { hashtag } = useParams();

	return (
		<StyledPage>
			<Header />
			<Container>
				<TitleBox>
					<TitlePage>#{hashtag}</TitlePage>
				</TitleBox>
				<StyledBody>
					<PostsBox>
						<HashtagPosts
							lastPost={lastPost}
							setLastPost={setLastPost}
							firstPost={firstPost}
							setFirstPost={setFirstPost}
						/>
					</PostsBox>
					<Box>
						<TrendingBox />
					</Box>
				</StyledBody>
			</Container>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const StyledBody = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 50px;
	@media (max-width: 610px) {
		margin-top: 0px;
	}
`;

const TitleBox = styled.div`
	width: 100%;
	max-width: 952px;
	@media (max-width: 952px) {
		max-width: 610px;
	}
`;

// const TrendingBox = styled.div`
// 	display: flex;
// 	justify-content: center;
// 	margin-top: 125px;
// 	margin-left: 30px;
// 	div {
// 		height: 100px;
// 		width: 200px;
// 		background-color: blueviolet;
// 	}
// 	@media (max-width: 937px) {
// 		display: none;
// 	}
// `;

const PostsBox = styled.div`
	display: flex;
	flex-direction: column;
	height: fit-content;
`;

const TitlePage = styled.p`
	color: white;
	font-family: "Oswald";
	font-size: 43px;
	font-weight: 700;
	margin-left: 10px;
	@media (max-width: 610px) {
		margin: 17px;
		margin-top: 10px;
		margin-bottom: 17px;
		font-size: 33px;
	}
`;

const Container = styled.div`
	width: 100%;
	margin-top: 125px;
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (max-width: 610px) {
		margin-top: 47px;
	}
`;

const Box = styled.div`
	margin-top: 16px;
`;
