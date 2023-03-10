import axios from "axios";
import { useContext, useState } from "react";
import ProjectContext from "../constants/Context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Post({ setLastPost }) {
	const [post, setPost] = useState({ text: "", link: "" });
	const [click, setClick] = useState(false);
	const { user, numberReloads, setNumberReloads } = useContext(ProjectContext);
	const navigate = useNavigate();

	function formHandler(e) {
		const { name, value } = e.target;
		setPost({ ...post, [name]: value });
	}

	function sendPostToBd(e) {
		e.preventDefault();
		setClick(true);

		const obj = { ...post };

		const URL = `${process.env.REACT_APP_API_BASE_URL}/publish`;

		const config = {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		};

		axios
			.post(URL, obj, config)
			.then((ans) => {
				setLastPost(ans.data.id);
				alert("Post realizado com sucesso!");
				setPost({ text: "", link: "" });
				setClick(false);
				navigate("/timeline");
				setNumberReloads(numberReloads + 1);
			})
			.catch((err) => {
				console.log(err);
				setClick(false);
			});
	}

	return (
		<StyledPost>
			<Div>
				<Image>
					<img src={user.photo} alt="" />
				</Image>
				<p>What are you going to share today?</p>
			</Div>
			<FormStyle onSubmit={sendPostToBd}>
				<input
					name="link"
					type="url"
					value={post.link}
					placeholder="http://..."
					onChange={formHandler}
					required
				/>
				<input
					style={{ height: "66px" }}
					name="text"
					type="text"
					value={post.text}
					placeholder="Awesome article about #javascript"
					onChange={formHandler}
				/>
				{click ? (
					<button
						type="submit"
						disabled={true}
						style={{ backgroundColor: "#777" }}
					>
						Publishing
					</button>
				) : (
					<button type="submit" disabled={false}>
						Publish
					</button>
				)}
			</FormStyle>
		</StyledPost>
	);
}

const StyledPost = styled.div`
	width: 100%;
	max-width: 611px;
	height: 209px;

	background-color: #fff;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	border-radius: 16px;
	p {
		margin-top: 21px;
		font-size: 20px;
		font-weight: 300;
		color: #707070;
	}
	@media (max-width: 610px) {
		border-radius: 0px;
	}
`;
const FormStyle = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	input,
	button {
		height: 30px;
		border-radius: 8px;
		border: none;
		margin: 2px 15px;
		align-self: flex-end;
	}
	input {
		width: 85%;
		background-color: #efefef;
		font-size: 15px;
		font-weight: 300;
	}
	button {
		width: 150px;
		color: #fff;
		font-weight: 700;
		font-size: 14px;
		background-color: #1877f2;
		:hover {
			cursor: pointer;
			opacity: 0.8;
		}
	}
	@media (max-width: 610px) {
		width: 100%;
		padding-right: 15px;
		padding-left: 15px;
		input {
			align-self: center;
			width: 100%;
		}
		button {
			margin-right: 0px;
		}
	}
`;

const Div = styled.div`
	display: flex;
	flex-direction: row;
	@media (max-width: 610px) {
		justify-content: center;
	}
`;

const Image = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	margin: 16px 18px 0 18px;
	overflow: hidden;
	background-color: white;
	img {
		height: 50px;
		margin-left: 50%;
		transform: translateX(-50%);
	}
	@media (max-width: 610px) {
		display: none;
	}
`;
