import styled from "styled-components";
import { ReactTagify } from "react-tagify";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import axios from "axios";
import ProjectContext from "../constants/Context";
import { useNavigate } from "react-router-dom";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import DeletePost from "./DeletePost";
import { BsPencil } from "react-icons/bs";
import { IconContext } from "react-icons";
import EditBox from "./EditBox";
import Comments from "./Comments";
import { AiOutlineComment } from "react-icons/ai";
import { getLikesData } from "../constants/functions";
import RepostIcon from "./RepostIcon";
import { BiRepost } from "react-icons/bi";

export function OnePost({ item, getPosts }) {
	const [disabled, setDisabled] = useState(false);
	const [openCommentBox, setOpenCommentBox] = useState(false);
	const postId = item.id;
	const [usersStr, setUsersStr] = useState("");
	const navigate = useNavigate();
	const { user } = useContext(ProjectContext);
	const [selfLike, setSelfLike] = useState(item.selfLike);
	const [likes, setLikes] = useState(item.likes);
	const [editBoxOpened, setEditBoxOpened] = useState(false);
	const [shownText, setShownText] = useState(item.text);
	const [commentCount, setCommetCount] = useState(item.comments.length);
	const [updatePost, setUpdatePost] = useState(0);
	const nav = useNavigate();

	useEffect(() => {
		getLikesData(user, postId)
			.then((res) => setUsersStr(res))
			.catch((err) => console.log(err));
	}, [updatePost, user]);

	const tagStyle = {
		color: "white",
		fontWeight: 700,
		cursor: "pointer",
	};

	function goToProfile() {
		navigate(`/user/${item.user_id}`);
	}

	function postLike() {
		if (!disabled) {
			setDisabled(true);
			const Url = `${process.env.REACT_APP_API_BASE_URL}/posts/${item.id}/like`;
			const config = {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			};
			axios
				.post(Url, {}, config)
				.then((answer) => {
					item.likes = answer.data.likes;
					item.selfLike = answer.data.selfLike;

					setLikes(item.likes);
					setSelfLike(item.selfLike);
					setDisabled(false);
					setUpdatePost(updatePost + 1);
				})
				.catch((err) => {
					console.log(err);
					setDisabled(false);
				});
		}
	}

	function removeLike() {
		if (!disabled) {
			setDisabled(true);
			const Url = `${process.env.REACT_APP_API_BASE_URL}/posts/${item.id}/like`;
			const config = {
				headers: {
					authorization: `Bearer ${user.token}`,
				},
			};
			axios
				.delete(Url, config)
				.then((answer) => {
					item.likes = answer.data.likes;
					item.selfLike = answer.data.selfLike;

					setLikes(item.likes);
					setSelfLike(item.selfLike);
					setDisabled(false);
					setUpdatePost(updatePost + 1);
				})
				.catch((err) => {
					console.log(err);
					setDisabled(false);
				});
		}
	}

	function openLink() {
		window.open(item.link);
	}

	function openComments() {
		if (openCommentBox) {
			setOpenCommentBox(false);
		} else {
			setOpenCommentBox(true);
		}
	}
	return (
		<>
			<Container>
				{item.shared === true ? (
					<StyledRepostMessage>
						<IconContext.Provider
							value={{ size: "20px", color: "#FFFFFF" }}
						>
							<BiRepost />
						</IconContext.Provider>
						<p>
							Re-posted by <strong>{user.name} </strong>{" "}
						</p>
					</StyledRepostMessage>
				) : (
					""
				)}

				<Post>
					<PerfilLikes>
						<img src={item.image} alt="perfil" />
						<Likes>
							{selfLike ? (
								<IoHeartSharp
									color="#AC0000"
									onClick={removeLike}
								/>
							) : (
								<IoHeartOutline
									color="white"
									onClick={postLike}
								/>
							)}
							<h1 id={`tooltip-anchor-${postId}`}>
								{likes} likes
							</h1>
							<Tooltip
								anchorId={`tooltip-anchor-${postId}`}
								content={usersStr}
								place="bottom"
								events={["hover"]}
							/>
						</Likes>
						<Likes>
							<AiOutlineComment
								color="white"
								onClick={openComments}
							/>
							<h1>{commentCount} comments</h1>
						</Likes>
						<RepostIcon postId={postId} />
					</PerfilLikes>
					<LinkPostBox>
						<StyeldNameContainer>
							<UserName onClick={goToProfile}>
								{item.username}
							</UserName>
							<StyledIcons>
								<IconContext.Provider
									value={{ color: "#FFFFFF" }}
								>
									{item.ownPost ? (
										<BsPencil
											id="edit"
											onClick={() => {
												setEditBoxOpened(
													!editBoxOpened
												);
											}}
										/>
									) : (
										""
									)}
									{item.ownPost ? (
										<DeletePost
											getPosts={getPosts}
											item={item}
										/>
									) : (
										""
									)}
								</IconContext.Provider>
							</StyledIcons>
						</StyeldNameContainer>
						{editBoxOpened ? (
							<EditBox
								previousText={item.text}
								setEditBoxOpened={setEditBoxOpened}
								postId={postId}
								shownText={shownText}
								setShownText={setShownText}
							/>
						) : (
							<ReactTagify
								tagStyle={tagStyle}
								tagClicked={(tag) => {
									nav(`/hashtag/${tag.replace("#", "")}`);
								}}
							>
								<Text>{shownText}</Text>
							</ReactTagify>
						)}
						<LinkPreview onClick={openLink}>
							<LinkInfo>
								{item.metadata?.linkTitle ===
								undefined ? null : (
									<Title>{item.metadata?.linkTitle}</Title>
								)}
								{item.metadata?.linkDescription ===
								undefined ? null : (
									<Description>
										{item.metadata?.linkDescription}
									</Description>
								)}
								<Link>{item.metadata?.link}</Link>
							</LinkInfo>
							{item.metadata?.linkImage === undefined ? null : (
								<img src={item.metadata.linkImage} alt="" />
							)}
						</LinkPreview>
					</LinkPostBox>
				</Post>
				<Comments
					openCommentBox={openCommentBox}
					item={item}
					setCommetCount={setCommetCount}
				/>
			</Container>
		</>
	);
}

const Container = styled.div`
	height: 100%;
	width: 100vw;
	max-width: 611px;
	background-color: #1e1e1e;
	margin-top: 16px;
	border-radius: 16px;
	display: flex;
	flex-direction: column;
	@media (max-width: 610px) {
		border-radius: 0px;
	}
`;

const Post = styled.div`
	background-color: black;
	width: 100vw;
	max-width: 611px;
	border-radius: 16px;
	display: flex;
	padding-right: 18px;
	z-index: 1;
	@media (max-width: 610px) {
		border-radius: 0px;
	}
`;

const StyledRepostMessage = styled.div`
	display: flex;
	height: 33px;
	margin: 7px 0 0 13px;
	align-items: center;
	p {
		color: #ffffff;
		font-family: "Lato", cursive;
		font-size: 11px;
		line-height: 13px;
		font-weight: 400;
		margin-left: 6px;

		strong {
			font-weight: 700;
		}
	}
`;

const PerfilLikes = styled.div`
	width: 87px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 17px;
	p {
		color: #ffffff;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 25px;
		margin-top: 17px;
	}
	@media (max-width: 610px) {
		img {
			width: 40px;
			height: 40px;
			margin-left: 15px;
			margin-right: 15px;
		}
	}
`;

const Likes = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 19px;
	svg {
		color: ${(props) => props.color};
		font-size: 20px;
		cursor: pointer;
	}
	h1 {
		margin-top: 4px;
		color: white;
		font-size: 11px;
	}
	@media (max-width: 610px) {
		margin-top: 15px;
		svg {
			font-size: 17px;
		}
		h1 {
			font-size: 9px;
		}
	}
`;

const LinkPostBox = styled.div`
	width: 505px;
	margin-top: 17px;
	margin-bottom: 17px;
	display: flex;
	flex-direction: column;
`;

const UserName = styled.p`
	font-size: 19px;
	font-family: "Lato";
	font-weight: 400;
	color: white;
	cursor: pointer;
	@media (max-width: 610px) {
		font-size: 17px;
	}
`;

const Text = styled.p`
	font-size: 17px;
	font-family: "Lato";
	font-weight: 400;
	color: #b7b7b7;
	margin-bottom: 12px;
	@media (max-width: 610px) {
		font-size: 15px;
		margin-bottom: 12px;
	}
`;

const LinkPreview = styled.div`
	width: 503px;
	border: 1px solid #4d4d4d;
	border-radius: 11px;
	display: flex;
	justify-content: space-between;
	cursor: pointer;
	img {
		width: 155px;
		height: 155px;
		border-bottom-right-radius: 12px;
		border-top-right-radius: 12px;
	}
	@media (max-width: 610px) {
		width: 100%;
		img {
			width: 95px;
			height: 100%;
		}
	}
`;

const LinkInfo = styled.div`
	max-width: 350px;
	width: 100%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	@media (max-width: 610px) {
		padding: 15px;
	}
`;

const Title = styled.p`
	font-size: 16px;
	font-family: "Lato";
	font-weight: 400;
	color: #cecece;
	margin-bottom: 8px;
	@media (max-width: 610px) {
		font-size: 11px;
		margin-bottom: 6px;
	}
`;

const Description = styled.p`
	font-size: 11px;
	font-family: "Lato";
	font-weight: 400;
	color: #9b9595;
	margin-bottom: 8px;
	@media (max-width: 610px) {
		font-size: 9px;
		margin-bottom: 6px;
	}
`;

const Link = styled.p`
	font-size: 11px;
	font-family: "Lato";
	font-weight: 400;
	color: #cecece;
	@media (max-width: 610px) {
		font-size: 9px;
	}
`;

const StyeldNameContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

const StyledIcons = styled.div`
	display: flex;
	width: 50px;
	justify-content: space-between;

	#edit {
		width: 13px;
	}

	&:hover {
		cursor: pointer;
	}

	@media (max-width: 610px) {
		width: 37px;
		#edit {
			width: 11px;
		}
	}
`;
