import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ProjectContext from "../constants/Context";

export default function Follow(props) {
	const { follow, setFollow } = props;
	const { id } = useParams();
	const { user } = useContext(ProjectContext);
	const [click, setClick] = useState(false);
	const navigate = useNavigate();

	function followButtonHandler(e) {
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};

		e.preventDefault();
		setClick(true);

		if (!follow) {
			axios
				.post(`${process.env.REACT_APP_API_BASE_URL}/follow/${id}`, {}, config)
				.then((ans) => {
					setFollow(true);
					setClick(false);
				})
				.catch((err) => {
					console.log(err.data);
				});
		} else {
			axios
				.delete(`${process.env.REACT_APP_API_BASE_URL}/unfollow/${id}`, config)
				.then((ans) => {
					setFollow(false);
					setClick(false);
				})
				.catch((err) => {
					console.log(err.data);
					alert("Failed to send request!");
				});
		}

		navigate(`/user/${id}`);
	}
	return (
		<>
			{!follow ? (
				<FollowButton
					color1="#fff"
					color2="#1877F2"
					disabled={click}
					onClick={followButtonHandler}
				>
					Follow
				</FollowButton>
			) : (
				<FollowButton
					color1="#1877F2"
					color2="#fff"
					disabled={click}
					onClick={followButtonHandler}
				>
					Unfollow
				</FollowButton>
			)}
		</>
	);
}

const FollowButton = styled.button`
	width: 115px;
	height: 30px;

	color: ${(props) => props.color1};
	font-weight: 700;
	font-size: 14px;

	background-color: ${(props) => props.color2};
	border-radius: 5px;

	margin-top: 40px;
	:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;
