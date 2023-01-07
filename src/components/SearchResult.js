import styled from "styled-components";

export default function SearchResult({ item }) {
	return (
		<>
			<Result>
				<Image>
					<img src={item.image} alt="perfil" />
				</Image>
				<h2>{item.username}</h2>
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
