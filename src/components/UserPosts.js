import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";
import { OnePost } from "../components/OnePost";
import ProjectContext from "../constants/Context";
import InfiniteScroll from "react-infinite-scroller";

export default function UserPosts(props) {
	const { setFirstPost, setLastPost, lastPost, firstPost } = props;
	const { id } = useParams();
	const { user, setUser, numberReloads } = useContext(ProjectContext);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [pageOwnerPosts, setPageOwnerPosts] = useState([]);
	const [render, setRender] = useState(1);
	const [userPage, setUserPage] = useState(0);
	const [loadMore, setLoadMore] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		if (!user.token) {
			nav("/");
		}
		setLoading(true);
		let limit = "";
		if (Number(userPage) === Number(id)) {
			if (lastPost !== null) {
				limit = `&lastPost=${lastPost}&firstPost=${firstPost}`;
			}
		}
		const URL = `${process.env.REACT_APP_API_BASE_URL}/user?id=${id}${limit}`;
		axios
			.get(URL)
			.then((ans) => {
				const listPosts = ans.data[1];
				setPageOwnerPosts(ans.data[1]);

				setLoading(false);

				if (!ans.data.length) {
					setError("There are no posts yet!");
					alert("There are no posts yet");
				} else {
					setError("");
					setFirstPost(listPosts[listPosts.length - 1].published_post_id);
					setLastPost(listPosts[0].published_post_id);
					setUserPage(listPosts[0].originaluser.id);
				}
			})
			.catch((err) => {
				console.log(err.data);
				if (err.response.status === 401) {
					localStorage.removeItem("user");
					setUser({ name: "", token: "", photo: "", id: 0 });
					nav("/");
				}
				setLoading(false);
				setError(
					"An error occured while trying to fetch the posts, please refresh the page"
				);
				alert(
					"An error occured while trying to fetch the posts, please refresh the page"
				);
			});
	}, [user, id, numberReloads]);

	async function scroll() {
		let limit = `&firstPost=${firstPost}`;
		const URL = `${process.env.REACT_APP_API_BASE_URL}/user?id=${id}${limit}`;
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.get(URL, config)
			.then((answer) => {
				const listPosts = answer.data[1];
				setPageOwnerPosts([...pageOwnerPosts, ...listPosts]);

				if (listPosts.length) {
					setFirstPost(listPosts[listPosts.length - 1].published_post_id);
				} else {
					setLoadMore(false);
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 401) {
					localStorage.removeItem("user");
					setUser({ name: "", token: "", photo: "", id: 0 });
					nav("/");
				}
			});
	}

	return (
		<StyledBody>
			{loading ? (
				<Container>
					<ThreeDots
						height="30"
						width="290"
						radius="15"
						color="white"
						ariaLabel="three-dots-loading"
						wrapperStyle={{}}
						wrapperClassName=""
						visible={true}
					/>
					<p>Loading...</p>
				</Container>
			) : error !== "" ? (
				<Container>
					<ErrorMessage>{error}</ErrorMessage>
				</Container>
			) : (
				<>
					<InfiniteScroll
						pageStart={0}
						loadMore={scroll}
						hasMore={loadMore}
						loader={
							<div className="loader" key={0}>
								Loading ...
							</div>
						}
					>
						{pageOwnerPosts.map((item) => (
							<OnePost
								key={item.published_post_id}
								setRender={setRender}
								render={render}
								item={item}
							/>
						))}
					</InfiniteScroll>
				</>
			)}
		</StyledBody>
	);
}

const StyledBody = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Container = styled.div`
	width: 100vw;
	max-width: 611px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 70px;
	p {
		font-size: 29px;
		font-family: "Lato";
		font-weight: 400;
		color: white;
		margin-top: 15px;
	}
`;

const ErrorMessage = styled.p`
	font-size: 23px;
	font-family: "Lato";
	font-weight: 400;
	color: white;
	margin-top: 15px;
`;
