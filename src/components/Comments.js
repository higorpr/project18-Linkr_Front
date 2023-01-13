import { useContext, useState } from "react";
import styled from "styled-components";
import OneComment from "./OneComment";
import ProjectContext from "../constants/Context";
import { IoPaperPlaneOutline } from "react-icons/io5";
import axios from "axios";

export default function Comments(props) {
	const { user } = useContext(ProjectContext);
	const { openCommentBox, item, setCommetCount } = props;
	const [value, setValue] = useState("");
    const [commentsNow, setCommentsNow] = useState(item.comments);

    function sendComment(){
        const Url = `${process.env.REACT_APP_API_BASE_URL}/posts/comment`;
        const config = {
            headers: {
                authorization: `Bearer ${user.token}`,
            },
        };
        const body = {
            text: value,
            post_id: item.id
        }
        axios
            .post(Url, body, config)
            .then((answer) => {
                item.comments = answer.data;
                setCommentsNow(answer.data);
                setValue("");
                setCommetCount(answer.data.length)
            })
            .catch((err) => {
                console.log(err);
            });
    }

	return (
		<>
			<Container>
				{openCommentBox ? (
					<>
						{commentsNow.map((item) => (
							<OneComment comment={item} />
						))}
						<PostComment>
							<img src={user.photo} alt="" />
							<InputDiv>
								<input
									placeholder="write a comment..."
									value={value}
									onChange={(event) => setValue(event.target.value)}
								/>
								<IoPaperPlaneOutline onClick={sendComment} />
							</InputDiv>
						</PostComment>
					</>
				) : null}
			</Container>
		</>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 15px;
	margin-right: 15px;
`;

const PostComment = styled.div`
	max-width: 571px;
	width: 100%;
	height: 83px;
	display: flex;
	align-items: center;
	justify-content: center;
	img {
		height: 39px;
		width: 39px;
		margin-right: 18px;
		border-radius: 20px;
		margin-left: 8px;
	}
`;

const InputDiv = styled.div`
	width: 100%;
	position: relative;

	input {
		width: 100%;
		height: 39px;
		border-radius: 8px;
		background-color: #252525;
		padding: 8px;
		outline: 0px;
		font-size: 14px;
		color: white;
		::placeholder {
			font-family: "Lato";
			font-style: italic;
			color: #575757;
			font-size: 14px;
		}
	}
	svg {
		position: absolute;
		right: 12px;
		top: 11px;
		width: 19px;
		height: 19px;
		color: #f3f3f3;
	}
`;
