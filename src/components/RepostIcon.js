import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";

export default function RepostIcon({postId}) {
	const [nShares, setNShares] = useState(0);

	useEffect(()=>{
		axios
			.get(`${process.env.REACT_APP_API_BASE_URL}/posts/shares/${postId}`)
			.then((res) => {
				setNShares(res.data.numberOfShares);
			})
			.catch((err) => console.log(err));
	},[])

	function follow() {
		axios.post(`${process.env.REACT_APP_API_BASE_URL}/posts/shares/${postId}`)
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
