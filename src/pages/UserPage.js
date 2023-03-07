import { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import UserProfile from "../components/UserProfile";
import UserPosts from "../components/UserPosts";
import TrendingBox from "../components/TrendingBox";

export default function UserPage() {
	const [lastPost, setLastPost] = useState(null);
	const [firstPost, setFirstPost] = useState(null);

	return (
		<StyledPage>
			<Header />
			<ProfileBox>
				<UserProfile />
			</ProfileBox>
			<StyledBody>
				<UserPosts
					lastPost={lastPost}
					setLastPost={setLastPost}
					firstPost={firstPost}
					setFirstPost={setFirstPost}
				/>
				<Box>
					<TrendingBox />
				</Box>
			</StyledBody>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	width: 100%;
	height: 100%;
`;

const ProfileBox = styled.div`
	margin-top: 53px;
	width: 100vw;
	display: flex;
	justify-content: center;
	@media (max-width: 610px) {
		margin-top: 0px;
	}
`;

const StyledBody = styled.div`
	display: flex;
	justify-content: center;
`;

const Box = styled.div`
	margin-top: 16px;
`;
