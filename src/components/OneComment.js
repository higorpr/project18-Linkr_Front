import styled from "styled-components";

export default function OneComment(props) {
	const { comment } = props;
	return (
		<>
			<Container>
				<Image>
					<img src={comment.image} alt="" />
				</Image>
				<CommentBox>
					<NameBox>
						<h1>{comment.username}</h1>
						{comment.postAuthor ? (
							<h2>• post’s author</h2>
						) : comment.following ? (
							<h2>• following</h2>
						) : null}
					</NameBox>
					<p>{comment.text}</p>
				</CommentBox>
			</Container>
		</>
	);
}

const Container = styled.div`
	width: 100%;
	max-width: 571px;
	height: fit-content;
	min-height: 68px;
	border-bottom: 1px solid #353535;
	display: flex;
	align-items: center;
	@media (max-width: 610px) {
		min-height: 50px;
		height: fit-content;
	}
`;

const Image = styled.div`
	height: 39px;
	width: 39px;
	border-radius: 50%;
	margin-right: 22px;
	margin-left: 8px;
	overflow: hidden;
	background-color: white;
	img {
		height: 39px;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	@media (max-width: 610px) {
		width: 30px;
		height: 30px;
		margin-left: 15px;
		margin-right: 15px;
		img {
			height: 30px;
		}
	}
`;

const CommentBox = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	p {
		color: #acacac;
		font-weight: 400;
		font-size: 14px;
		font-family: "Lato";
		margin-bottom: 5px;
	}
`;

const NameBox = styled.div`
	display: flex;
	margin-bottom: 5px;
	h1 {
		color: #f3f3f3;
		font-size: 14px;
		font-weight: 700;
		margin-right: 5px;
		font-family: "Lato";
		margin-top: 5px;
	}
	h2 {
		margin-top: 5px;
		color: #565656;
		font-weight: 400;
		font-size: 14px;
		font-family: "Lato";
	}
`;
