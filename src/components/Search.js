import styled from "styled-components";
import { IoSearchSharp } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useContext, useState } from "react";
import ProjectContext from "../constants/Context";
import axios from "axios";
import SearchResult from "./SearchResult";

export default function Search(props) {
	const { value, setValue, result, setResult, showResult, setShowResult } =
		props;
	const { user } = useContext(ProjectContext);

	let timeSearch = 0;
	function inputSearch(event) {
		const minLength = 3;
		clearTimeout(timeSearch);
		setValue(event.target.value);
		if (event.target.value.length >= minLength) {
			timeSearch = setTimeout(() => search(event), 300);
		} else {
			setResult([]);
		}
	}

	function search(event) {
		const Url = `http://localhost:4000/search?text=${event.target.value}`;
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		axios
			.get(Url, config)
			.then((answer) => {
				setResult(answer.data);
				console.log(answer.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	return (
		<>
			<SearchBox
				onClick={() => setShowResult(true)}
				onBlur={() => setShowResult(false)}
			>
				<InputBox>
					<Input
						placeholder="Search for people"
						onChange={inputSearch}
						onChangeCapture={inputSearch}
						value={value}
					/>
					<IoSearchSharp />
				</InputBox>
				{showResult
					? result.map((item) => (
							<SearchResult
								key={item.id}
								item={item}
								setResult={setResult}
								setShowResult={setShowResult}
								setValue={setValue}
							/>
					  ))
					: null}
			</SearchBox>
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

const SearchBox = styled.div`
	width: 100%;
	max-width: 563px;
	height: fit-content;
	background-color: #e7e7e7;
	border-radius: 8px;
`;
