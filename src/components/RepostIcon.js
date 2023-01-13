import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { IconContext } from "react-icons";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../constants/Context";

export default function RepostIcon({ postId }) {
	const [nShares, setNShares] = useState(0);
	const [updateControl, setUpdateControl] = useState(0);
	const { user } = useContext(ProjectContext);

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/posts/shares/${postId}`)
			.then((res) => {
				setNShares(res.data.numberOfShares);
			})
			.catch((err) => console.log(err));
	}, [updateControl]);

	function follow() {
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.post(
				`${process.env.REACT_APP_API_BASE_URL}/posts/shares/${postId}`,
				{},
				config
			)
			.then((res) => {
				console.log(res);
				setUpdateControl(updateControl + 1);
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data)
			});
	}

	return (
		<IconContext.Provider value={{ color: "#FFFFFF", size: "22px" }}>
			<StyledIcon>
				<BiRepost onClick={follow} />
				<p>
					{nShares} {nShares <= 1 ? "re-post" : "re-posts"}
				</p>
			</StyledIcon>
		</IconContext.Provider>
	);
}
const StyledIcon = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 18px;
	justify-content: center;
	align-items: center;

	&:hover {
		cursor: pointer;
	}

	p {
		color: #ffffff;
		font-family: "Lato", cursive;
		font-size: 11px;
		line-height: 13px;
		text-align: center;
		font-weight: 400;
		margin-top: 1px;
	}
`;
