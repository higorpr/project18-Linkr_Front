import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProjectContext from "../constants/Context";

export default function EditBox({
	previousText,
	setEditBoxOpened,
	postId,
	ShownText,
	setShownText,
}) {
	const { user, numberReloads, setNumberReloads } = useContext(ProjectContext);
	const [text, setText] = useState(previousText);
	const [loading, setLoading] = useState(false);
	const inputEl = useRef(null);

	useEffect(() => {
		inputEl.current.focus();
	}, []);

	function sendOrCancel(e) {
		// console.log(e.key);
		if (e.key === "Enter") {
			e.preventDefault();
			if (text.trim() !== previousText.trim()) {
				setLoading(true);
				const url = `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`;
				const body = { text: text };
				const config = {
					headers: {
						Authorization: `Bearer ${user.token}`,
					},
				};

				axios
					.put(url, body, config)
					.then((res) => {
						setNumberReloads(numberReloads + 1);
						setEditBoxOpened(false);
						setLoading(false);
						setShownText(text);
					})
					.catch((err) => {
						console.log(err);
						alert("It was not possible to edit your post, please try again.");
						setLoading(false);
					});
			} else {
				setEditBoxOpened(false);
				alert("There were no changes to be sent");
			}
		}

		if (e.key === "Escape") {
			setEditBoxOpened(false);
		}
	}

	return (
		<StyledForm>
			<textarea
				ref={inputEl}
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
				wrap="hard"
				onKeyDown={sendOrCancel}
				disabled={loading}
			/>
		</StyledForm>
	);
}

const StyledForm = styled.div`
	margin-bottom: 10px;

	textarea {
		background-color: #ffffff;
		font-family: "Lato";
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		padding: 4px 9px;
		box-sizing: border-box;
		border-radius: 7px;
		width: 503px;
		height: 44px;
		border: none;
		word-break: break-all;
		word-wrap: break-word;

		&:focus {
			outline: none;
		}
	}
`;
