import { useState } from "react";
import styled from "styled-components";

export default function EditBox({ previousText }) {
	const [text, setText] = useState(previousText);

    function sendOrCancel(e) {
        console.log(e.key)
        if (e.key === 'Enter') {
            console.log('Apertei Enter!')
        }

        if (e.key === 'Escape'){
            
        }

    }
	return (
		<StyledForm>
			<textarea
				value={text}
				onChange={(e) => {
					setText(e.target.value);
				}}
				wrap="hard"
                onKeyDown={sendOrCancel}
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
