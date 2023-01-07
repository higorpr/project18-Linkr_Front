import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { OnePost } from "./OnePost";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import ProjectContext from "../constants/Context";

export function Posts() {
	const [loading, setLoading] = useState(true);
	const [post, setPost] = useState([]);
	const [error, setError] = useState("");
	const { user, setUser } = useContext(ProjectContext);

	useEffect(() => {
		const Url = "http://localhost:4000/posts";
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		if (user.token !== "") {
			axios
				.get(Url, config)
				.then((answer) => {
					setPost(answer.data);
					setLoading(false);
					if (!answer.data.length) {
						setError("There are no posts yet!");
						alert("There are no posts yet");
					} else {
						setError("");
					}
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
	}, []);

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
				post.map((item) => <OnePost key={item.id} item={item} />)
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
