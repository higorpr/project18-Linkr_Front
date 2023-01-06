import styled from "styled-components";
import Post from "./Post";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { useState } from "react";

export default function Main() {
	const [openedMenu, setOpenedMenu] = useState(false);

	return (
		<StyledPage>
			<StyledTop>
				<p>linkr</p>
				<StyledTopMenu onClick={() => setOpenedMenu(!openedMenu)}>
					{!openedMenu ? <SlArrowUp /> : <SlArrowDown />}
                    <img src="https://img.quizur.com/f/img63488d6881cd57.74140886.jpg?lastEdited=1665699358" />
				</StyledTopMenu>
			</StyledTop>
			<StyledBody>
                {/* Insert here the code for the body of the main page */}
            </StyledBody>
		</StyledPage>
	);
}

const StyledPage = styled.div`
	width: 100%;
	height: 100%;
`;

const StyledTop = styled.div`
	background-color: #151515;
	display: flex;
	justify-content: space-between;
	position: fixed;
	z-index: 1;
	left: 0;
	top: 0;
	color: #ffffff;
    width: 100%;
    height: 72px;


	p {
		font-weight: 700;
		font-size: 49px;
		line-height: 54px;
		font-family: "Passion One", cursive;
		margin: 10px 0 0 28px;
	}
`;

const StyledTopMenu = styled.div`
	display: flex;
    margin-right: 17px;
    justify-content: center;
    align-items: center;

    img {
        border-radius: 50%;
        border: none;
        width: 53px;
        height: 53px;
        margin-left: 16.3px;
    }

`;

const StyledBody = styled.div``;
