import styled from "styled-components";
import { BiRepost } from "react-icons/bi";
import axios from "axios";
import { IconContext } from "react-icons";
import { useState } from "react";

export default function RepostIcon() {
	const [nReposts, setNReposts] = useState(0);

	function toggleFollow() {
		
	}

	return (
		<IconContext.Provider value={{ color: "#FFFFFF", size: "22px" }}>
			<StyledIcon>
				<BiRepost onClick={toggleFollow} />
				<p>
					{nReposts} {nReposts <= 1 ? "re-post" : "re-posts"}
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
