import { useState } from "react";
import styled from "styled-components";
import Post from "../components/Post";
import { Posts } from "../components/Posts";
import Header from "../components/Header";
import TrendingBox from "../components/TrendingBox";
import TimelineUpdate from "../components/timelineUpdate";

export default function Main() {
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState([]);
	const [lastPost, setLastPost] = useState(null);
	const [firstPost, setFirstPost] = useState(null);

	const updatePosts = (newPosts) => {
		setPosts(newPosts);
	};

	return (
		<StyledPage>
			<Header />
			<Container>
				<TitleBox>
					<TitlePage>timeline</TitlePage>
				</TitleBox>
				<StyledBody>
					<PostsBox>
						<Post setLastPost={setLastPost}></Post>
						<TimelineUpdate
							posts={posts}
							updatePosts={updatePosts}
							post={post}
							setPost={setPost}
							setLastPost={setLastPost}
						/>
						<Posts
							posts={posts}
							post={post}
							setPost={setPost}
							updatePosts={updatePosts}
							lastPost={lastPost}
							setLastPost={setLastPost}
							firstPost={firstPost}
							setFirstPost={setFirstPost}
						/>
					</PostsBox>
					<TrendingBox />
				</StyledBody>
			</Container>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	width: 100%;
	height: 100%;
`;

const StyledBody = styled.div`
	display: flex;
	justify-content: center;
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

const TitleBox = styled.div`
	width: 100%;
	max-width: 952px;
	@media (max-width: 952px) {
		max-width: 610px;
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
	margin-bottom: 43px;
	@media (max-width: 610px) {
		margin: 17px;
		margin-bottom: 17px;
		font-size: 33px;
	}
`;
