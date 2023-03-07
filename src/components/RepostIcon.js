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
	const [repostButtons, setRepostButtons] = useState(false);

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
				setUpdateControl(updateControl + 1);
				setRepostButtons(false);
			})
			.catch((err) => {
				console.log(err);
				alert(err.response.data);
				setRepostButtons(false);
			});
	}

	return (
		<IconContext.Provider value={{ color: "#FFFFFF", size: "22px" }}>
			<StyledIcon>
				<BiRepost
					onClick={() => {
						setRepostButtons(true);
					}}
				/>
				<p>
					{nShares} {nShares <= 1 ? "re-post" : "re-posts"}
				</p>
			</StyledIcon>
			{repostButtons ? (
				<Overlay>
					<StyledConfirm>
						<p>Do you want to re-post this link?</p>
						<StyledButtons>
							<StyledButtonNo
								onClick={() => {
									setRepostButtons(false);
								}}
							>
								No, cancel
							</StyledButtonNo>
							<StyledButtonYes onClick={follow}>Yes,share!</StyledButtonYes>
						</StyledButtons>
					</StyledConfirm>
				</Overlay>
			) : (
				""
			)}
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

const Overlay = styled.div`
	z-index: 3;
	position: fixed;
	background-color: rgba(255, 255, 255, 0.7);
	left: 0;
	top: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const StyledConfirm = styled.div`
	background-color: #333333;
	border-radius: 20px;
	width: 597px;
	height: 210px;
	display: flex;
	flex-direction: column;
	align-items: center;

	p {
		margin: 42px 0 23px 0;
		font-family: "Lato";
		font-size: 29px;
		line-height: 34.8px;
		font-weight: 700;
		text-align: center;
		width: 299px;
	}
`;

const StyledButtons = styled.div`
	display: flex;
	width: 295px;
	justify-content: space-between;
`;

const StyledButtonYes = styled.button`
	background-color: #1877f2;
	color: white;
	font-size: 18px;
	line-height: 21.6px;
	font-family: "Lato";
	font-weight: 700;
	width: 134px;
	height: 37px;
	border-radius: 5px;
	&:hover {
		cursor: pointer;
	}
`;

const StyledButtonNo = styled.button`
	background-color: white;
	color: #1877f2;
	font-size: 18px;
	line-height: 21.6px;
	font-family: "Lato";
	font-weight: 700;
	width: 134px;
	height: 37px;
	border-radius: 5px;

	&:hover {
		cursor: pointer;
	}
`;
