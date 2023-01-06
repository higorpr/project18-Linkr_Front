import styled from "styled-components";

export default function Search() {
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
			<Input onChange={inputSearch} />
		</>
	);
}

const Input = styled.input`
	height: 43px;
	width: 100%;
	max-width: 563px;
	border-radius: 8px;
	margin-left: 35px;
	margin-right: 35px;
	outline: 0px;
	padding: 14px;
`;
