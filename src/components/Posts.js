import axios from "axios";
import { useEffect, useState } from "react";
import { OnePost } from "./OnePost";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

export function Posts() {
	const [loading, setLoading] = useState(true);
	const [post, setPost] = useState([]);

	useEffect(() => {
		const Url = "http://localhost:4000/posts";
		const config = {
			headers: {
				authorization: `Bearer 37802355-cf79-4fb1-8a35-f64445d23408`,
			},
		};

		axios
			.get(Url, config)
			.then((answer) => {
				setPost(answer.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				alert(
					"An error occured while trying to fetch the posts, please refresh the page"
				);
			});
	}, []);

	return (
		<>
			{loading ? (
				<Loading>
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
				</Loading>
			) : (
				post.map((item) => <OnePost key={item.id} item={item} />)
			)}
		</>
	);
}

const Loading = styled.div`
	width: 611px;
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
