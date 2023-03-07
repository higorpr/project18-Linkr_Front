import { useEffect, useContext, useState } from "react";
import styled from "styled-components";
import Follow from "../components/Follow";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProjectContext from "../constants/Context";

export default function UserProfile(props) {
	const { id } = useParams();
	const { user, setUser } = useContext(ProjectContext);
	const [follow, setFollow] = useState(false);
	const [loading, setLoading] = useState(true);
	const [profile, setProfile] = useState();
	const nav = useNavigate();

	useEffect(() => {
		if (!user.token) {
			nav("/");
		}
		setLoading(true);
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};

		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/user/profile/${id}`, config)
			.then((ans) => {
				setFollow(ans.data[0].following);
				setProfile(ans.data[0]);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err.data);
				if (err.response.status === 401) {
					localStorage.removeItem("user");
					setUser({ name: "", token: "", photo: "", id: 0 });
					nav("/");
				}
			});
	}, [id, nav, setUser, user]);

	return (
		<>
			{loading ? null : (
				<PostsBox>
					<TitlePage>
						<img src={profile?.image} alt="User" />
						<h1>{profile?.username}'s posts</h1>
					</TitlePage>
					{profile.selfProfile ? null : (
						<Follow follow={follow} setFollow={setFollow} />
					)}
				</PostsBox>
			)}
		</>
	);
}

const PostsBox = styled.div`
	width: 100%;
	max-width: 952px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	justify-content: space-between;
	@media (max-width: 952px) {
		max-width: 610px;
		padding-left: 10px;
		padding-right: 10px;
	}
`;

const TitlePage = styled.p`
	color: white;
	font-family: "Oswald";
	font-size: 43px;
	font-weight: 700;
	margin-top: 90px;
	margin-bottom: 43px;
	display: flex;
	align-items: center;
	margin-right: 20px;

	img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-right: 15px;
	}

	@media (max-width: 610px) {
		margin: 17px;
		margin-top: 37px;
		margin-bottom: 17px;
		font-size: 33px;
		margin-right: 15px;
		img {
			width: 40px;
			height: 40px;
		}
	}
`;
