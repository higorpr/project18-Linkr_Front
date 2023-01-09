import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import Header from "../components/Header";
import { ThreeDots } from "react-loader-spinner";
import { OnePost } from "../components/OnePost";


export default function UserPage() {

	const { id } = useParams();
	const [pageOwner, setPageOwner] = useState({username:"", image:""});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [pageOwnerPosts, setPageOwnerPosts] = useState([]);

	useEffect(() => {
		console.log("ID: ", id);
		const URL = `https://api-linkr-sql-9ai1.onrender.com/user/${id}`
		axios.get(URL)
			.then((ans) => {
				console.log(ans.data);
				setPageOwner({username:ans.data[0].username, image: ans.data[0].image});
				setPageOwnerPosts(ans.data);

				setLoading(false);

				if (!ans.data.length) {
					setError("There are no posts yet!");
					alert("There are no posts yet");
				} else {
					setError("");
				}
			})
			.catch((err) => {
				console.log(err.response.data);
				setLoading(false);
				setError(
					"An error occured while trying to fetch the posts, please refresh the page"
				);
				alert(
					"An error occured while trying to fetch the posts, please refresh the page"
				);
			});
	}, [])

	return (
		<StyledPage>
			<Header />
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
				) :
					<>
						<PostsBox>
							<TitlePage>
								<img src={pageOwner.image} alt="User"/>
								{pageOwner.username}'s posts
							</TitlePage>
						</PostsBox>
						{
							pageOwnerPosts.map((item) => <OnePost key={item.id} item={item} />)
						}

					</>}
			</StyledBody>
		</StyledPage>);
}


const StyledPage = styled.div`
	width: 100%;
	height: 100%;
`;



const StyledBody = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
	
	img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-top: 17px;
		margin-right: 20px;
	}

	@media (max-width: 610px) {
		margin: 17px;
		margin-top: 17px;
		margin-bottom: 17px;
		font-size: 33px;
		img {
			width: 40px;
			height: 40px;
			margin-left: 15px;
			margin-right: 15px;
		}
	}
	
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
