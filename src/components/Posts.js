import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { OnePost } from "./OnePost";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import ProjectContext from "../constants/Context";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroller";

export function Posts(props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { user, setUser, numberReloads } = useContext(ProjectContext);
	const {
		updatePosts,
		post,
		setPost,
		setFirstPost,
		setLastPost,
		lastPost,
		firstPost,
	} = props;
	const [render, setRender] = useState(1);
	const [loadMore, setLoadMore] = useState(true);
	const nav = useNavigate();

	function getFollows() {
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		let response;

		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/followeds`, config)
			.then((ans) => {
				if (ans.status === 404) {
					response = false;
				} else {
					response = true;
				}
			})
			.catch((err) => {
				console.log(err.data);
			});

		return response;
	}

	useEffect(() => {
		if (!user.token) {
			nav("/");
		}
		setLoading(true);
		let limit = "";
		if (lastPost !== null) {
			limit = `?lastPost=${lastPost}&firstPost=${firstPost}`;
		}
		const Url = `${process.env.REACT_APP_API_BASE_URL}/posts${limit}`;
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};

		axios
			.get(Url, config)
			.then((answer) => {
				const listPosts = answer.data;

				setPost(listPosts);
				setLoading(false);
				if (listPosts.length === 0) {
					if (getFollows()) {
						setError("No posts found from your friends");
					} else {
						setError("You don't follow anyone yet. Search for new friends!");
					}
					alert("There are no posts yet");
				} else {
					setError("");
					setFirstPost(listPosts[listPosts.length - 1].published_post_id);
					setLastPost(listPosts[0].published_post_id);
				}
				updatePosts();
			})
			.catch((err) => {
				console.log(err);
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
	}, [user, numberReloads, render]);

	async function scroll() {
		let limit = `?firstPost=${firstPost}`;
		const Url = `${process.env.REACT_APP_API_BASE_URL}/posts${limit}`;
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.get(Url, config)
			.then((answer) => {
				const listPosts = answer.data;

				setPost([...post, ...listPosts]);
				if (listPosts.length) {
					setFirstPost(listPosts[listPosts.length - 1].published_post_id);
				} else {
					setLoadMore(false);
				}
				updatePosts();
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
		<>
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
				<ContainerPosts>
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
						{post.map((item) => (
							<OnePost
								key={item.published_post_id}
								render={render}
								setRender={setRender}
								item={item}
							/>
						))}
					</InfiniteScroll>
				</ContainerPosts>
			)}
		</>
	);
}

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

const ContainerPosts = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 50px;
`;
