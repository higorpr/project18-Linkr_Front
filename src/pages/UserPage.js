import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { ThreeDots } from "react-loader-spinner";
import { OnePost } from "../components/OnePost";
import ProjectContext from "../constants/Context";

export default function UserPage() {
	const { id } = useParams();
	const { user } = useContext(ProjectContext);
	const [pageOwner, setPageOwner] = useState({ username: "", image: "" });
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [pageOwnerPosts, setPageOwnerPosts] = useState([]);
	const [follow, setFollow] = useState('Follow');

	function getPosts() {
		const URL = `${process.env.REACT_APP_API_BASE_URL}/user/${id}`;
		axios
			.get(URL)
			.then((ans) => {
				console.log(ans.data);
				setPageOwner({
					username: ans.data[0].username,
					image: ans.data[0].image,
				});
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
	}

	function followButtonHandler(e){
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};

		e.preventDefault();
		if(follow === 'Follow'){
			axios.post(`http://localhost:4000/follow/${id}`,{},config)
			.then((ans)=>{
				console.log(ans.data);
				setFollow('Unfollow');
			}).catch((err)=>{
				console.log(err.data);
			})
		} else if (follow === 'Unfollow'){
			axios.delete(`http://localhost:4000/unfollow/${id}`,config)
			.then((ans)=>{
				console.log(ans.data);
				setFollow('Follow');
			}).catch((err)=>{
				console.log(err.data);
			});
		}
	}

	useEffect(() => {
		console.log("Owner Id: ", id);
		console.log("User Id: ", user.id);
		
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};

		const obj = {id: user.id}
		const followed = axios.get(`http://localhost:4000/following/${id}`, config)
		.then((ans)=>{
			console.log(ans);
			if(ans.status === 200){
				setFollow('Unfollow');
			}
 		}).catch((err)=>{
			console.log(err.data);
		});

		getPosts();
	}, [id, user]);

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
				) : (
					<>
						<PostsBox>
							<TitlePage>
								<img src={pageOwner.image} alt="User" />
								{pageOwner.username}'s posts
							</TitlePage>
							{user.id !== id ?
								(
									<FollowButton onClick={followButtonHandler}>{follow}</FollowButton>
								):<></>
							}
						</PostsBox>
						{pageOwnerPosts.map((item) => (
							<OnePost key={item.id} getPosts={getPosts} item={item} />
						))}
					</>
				)}
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
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-top: 72px;
`;

const PostsBox = styled.div`
	width: 670px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	@media(max-width: 670px){
		width: 580px;
	}
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
const FollowButton = styled.button`
	width: 115px;
	height: 30px;

	color: #fff;
	font-weight: 700;
	font-size: 14px;
	
	background-color: #1877F2;
	border-radius: 5px;

	margin-top: 40px;
	:hover{
		cursor: pointer;
		opacity: 0.8;
	}
`