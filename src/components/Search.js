import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useState } from "react";

export default function Search() {
	const [result, setResult] = useState(false);

	let timeSearch = 0;
	function inputSearch(event) {
		const minLength = 3;
		clearTimeout(timeSearch);
		if (event.target.value.length >= minLength) {
			timeSearch = setTimeout(() => search(event), 300);
		}
	}

	function search(event) {
		console.log(event.target.value);
	}

	return (
		<>
			<InputBox>
				<Input placeholder="Search for people" onChange={inputSearch} />
				<IoSearchSharp />
			</InputBox>
		</>
	);
}

const Input = styled.input`
	height: 100%;
	width: 100%;
	max-width: 563px;
	border-radius: 8px 0px 0px 8px;
	outline: 0px;
	padding: 14px;
	font-family: "Lato";
	font-size: 19px;
	::placeholder {
		font-size: 19px;
		color: #c6c6c6;
		font-family: "Lato";
		font-weight: 400;
	}
`;

const InputBox = styled.div`
	height: 43px;
	width: 100%;
	max-width: 563px;
	border-radius: 8px;
	display: flex;
	background-color: white;
	justify-content: center;
	align-items: center;
	svg {
		color: blue;
		font-size: 25px;
		margin-right: 5px;
		color: #c6c6c6;
	}
`;
