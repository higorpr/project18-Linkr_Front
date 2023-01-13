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
			<StyledBody>
				<PostsBox>
					<TitlePage>timeline</TitlePage>
					<Post></Post>
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
	margin-top: 72px;
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
