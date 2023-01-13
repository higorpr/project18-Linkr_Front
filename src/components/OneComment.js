import styled from "styled-components";

export default function OneComment(props) {
	const { comment } = props;
	console.log(comment);
	return (
		<>
			<Container>
				<img src={comment.image} />
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
	height: 68px;
	border-bottom: 1px solid #353535;
	display: flex;
	align-items: center;
	img {
		height: 39px;
		width: 39px;
		border-radius: 20px;
		margin-right: 22px;
		margin-left: 8px;
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
	}
	h2 {
		color: #565656;
		font-weight: 400;
		font-size: 14px;
		font-family: "Lato";
	}
`;
