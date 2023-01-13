import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function SearchResult(props) {
	const { item, setValue, setResult } = props;
	const navigate = useNavigate();

	function goToProfile() {
		setValue("");
		setResult([]);
		navigate(`/user/${item.id}`);
	}

	function click(event) {
		event.preventDefault();
		event.stopPropagation();
	}

	return (
		<>
			<Result onClick={goToProfile} onMouseDown={click}>
				<Image>
					<img src={item.image} alt="perfil" />
				</Image>
				<h2>{item.username}</h2>
				{item.following ? <h3>• following</h3> : null}
			</Result>
		</>
	);
}

const Result = styled.div`
	display: flex;
	align-items: center;
	padding-left: 15px;
	height: 50px;
	h2 {
		font-size: 19px;
		color: #515151;
		font-weight: 400;
		font-family: "Lato";
		margin: 0px 0px 0px 12px;
	}
	h3 {
		font-size: 19px;
		color: #c5c5c5;
		font-weight: 400;
		font-family: "Lato";
		margin: 0px 0px 0px 7px;
	}
`;

const Image = styled.div`
	height: 39px;
	width: 39px;
	border-radius: 20px;
	overflow: hidden;
	background-color: white;
	img {
		height: 39px;
		width: 39px;
	}
`;
