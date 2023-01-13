import axios from "axios";
import { useContext, useEffect, useState, useCallback } from "react";
import { OnePost } from "./OnePost";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import ProjectContext from "../constants/Context";

export function Posts(props) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { user, numberReloads } = useContext(ProjectContext);
	const { updatePosts, post, setPost, setFirstPost, setLastPost, lastPost, firstPost } = props;
	const [closeComment, setCloseComment] = useState(1);

	function getFollows (){
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		let response;

		axios
			.get(`http://localhost:4000/followeds`, config)
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

	function getPosts() {
		setLoading(true);
		let limit = ''
		if(lastPost!==null){
			console.log(lastPost)
			limit = `?lastPost=${lastPost}&firstPost=${firstPost}`
		}
		const Url = `${process.env.REACT_APP_API_BASE_URL}/posts${limit}`;
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		if (user.token !== "") {
			axios
				.get(Url, config)
				.then((answer) => {
					console.log(answer.data);
					setPost(answer.data);
					setFirstPost(answer.data[answer.data.length-1].published_post_id)
					setLastPost(answer.data[0].published_post_id)
					setLoading(false);
					if (answer.data.length === 0) {
						if(getFollows()){
							setError("No posts found from your friends");
						} else {
							setError("You don't follow anyone yet. Search for new friends!");
						}
						alert("There are no posts yet");
					} else {
						setError("");
					}
					updatePosts();
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
					setError(
						"An error occured while trying to fetch the posts, please refresh the page"
					);
					alert(
						"An error occured while trying to fetch the posts, please refresh the page"
					);
				});
		}
	} /*, [user.token, updatePosts]);*/


	useEffect(() => {
		getPosts();
	}, [user, numberReloads]);

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
				post.map((item) => (
					<OnePost
						key={item.published_post_id}
						getPosts={getPosts}
						item={item}
						closeComment={closeComment}
						setCloseComment={setCloseComment}
					/>
				))
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
