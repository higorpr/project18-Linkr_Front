import { IoMdTrash } from "react-icons/io";
import styled from "styled-components";
import { useState, useContext } from "react";
import ProjectContext from "../constants/Context";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function DeletePost({ getPosts, item }) {
	const [openConfirm, setOpenConfirm] = useState(false);
	const [loading, setLoading] = useState(false);
	const { user } = useContext(ProjectContext);

	function deletePost() {
		setLoading(true);
		const Url = `http://localhost:4000/post/${item.id}`;
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.delete(Url, config)
			.then((answer) => {
				setLoading(false);
				setOpenConfirm(false);
				getPosts();
				console.log(answer.data);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				setOpenConfirm(false);
				alert("Não foi possivel excluir o post!");
			});
	}

	return (
		<DeleteBox>
			<IoMdTrash onClick={() => setOpenConfirm(true)} />
			{openConfirm ? (
				<ConfirmDelete onClick={() => setOpenConfirm(false)}>
					<Container onClick={(e) => e.stopPropagation()}>
						{loading ? (
							<ContainerLoading>
								<ThreeDots
									height="30"
									width="290"
									radius="15"
									color="white"
									ariaLabel="three-dots-loading"
									wrapperStyle={{}}
									wrapperClassName=""
									visible={true}
								/>
								<p>Loading...</p>
							</ContainerLoading>
						) : (
							<DeleteTextButtons>
								<h2>Are you sure you want to delete this post?</h2>
								<div>
									<ButtonCancel onClick={() => setOpenConfirm(false)}>
										No, go back
									</ButtonCancel>
									<ButtonDelete onClick={deletePost}>
										Yes, delete it
									</ButtonDelete>
								</div>
							</DeleteTextButtons>
						)}
					</Container>
				</ConfirmDelete>
			) : null}
		</DeleteBox>
	);
}

const DeleteBox = styled.div`
	svg {
		height: 16px;
		width: 16px;
		color: white;
		cursor: pointer;
	}
	@media (max-width: 610px) {
		svg {
			height: 14px;
			width: 14px;
		}
	}
`;

const ConfirmDelete = styled.div`
	z-index: 2;
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

const Container = styled.div`
	height: 262px;
	max-width: 597px;
	width: 100vw;
	border-radius: 50px;
	background-color: #333333;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const DeleteTextButtons = styled.div`
	width: 338px;
	display: flex;
	flex-direction: column;
	align-items: center;
	h2 {
		font-size: 32px;
		font-family: "Lato";
		color: white;
		text-align: center;
		margin-bottom: 47px;
	}
	div {
		display: flex;
		justify-content: space-between;
		width: 300px;
	}
`;

const ButtonCancel = styled.button`
	background-color: white;
	width: 134px;
	height: 37px;
	border-radius: 5px;
	font-family: "Lato";
	font-size: 18px;
	color: #1877f2;
	cursor: pointer;
`;

const ButtonDelete = styled.button`
	background: #1877f2;
	width: 134px;
	height: 37px;
	border-radius: 5px;
	font-family: "Lato";
	font-size: 18px;
	color: white;
	cursor: pointer;
`;

const ContainerLoading = styled.div`
	width: 100vw;
	max-width: 611px;
	display: flex;
	flex-direction: column;
	align-items: center;
	p {
		font-size: 29px;
		font-family: "Lato";
		font-weight: 400;
		color: white;
		margin-top: 15px;
	}
	svg {
		width: 350px;
	}
	@media (max-width: 610px) {
		svg {
			width: 350px;
		}
	}
`;
