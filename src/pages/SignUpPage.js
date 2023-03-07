import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { signUpUrl } from "../constants/urls";
import '../styles/SignUpPage.css';
import styled from 'styled-components';

export default function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);

    const navigate = useNavigate();

    async function handleSingUp(e) {
        e.preventDefault();
        
        fetch( signUpUrl, {
            method: 'POST',
            body: JSON.stringify({ email, password, username, image }),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
            if (res.status === 409) {
                // O email já está sendo usado
                alert('Email já está sendo usado');
            } else if (res.status === 201) {
                // O usuário foi criado com sucesso
                alert('Usuário criado com sucesso');
                navigate('/');
            }
            else if (res.status === 500) {
                // Erro interno do servidor
                alert('Erro interno do servidor');
            }
        })
    }

    if( isEmpty === true ){
        alert("Preencha todos os campos");
        setIsEmpty(false);
    }

    return (
        <StyledPage>
            <StyledLeft>
                <h1>linkr</h1>
                <h2>save, share and discover the best links on the web</h2>
            </StyledLeft>
            <StyledRight>
                <StyledForm onSubmit={handleSingUp}>
                    <input type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="url" placeholder="picture url" value={image} onChange={e => setImage(e.target.value)} />
                    <StyledButton type="submit" onClick={() => {
                        if(email === "" || password === "" || username === "" || image === ""){
                            setIsEmpty(true)}
                        else{
                            setTimeout(() => {
                                setIsEmpty(false);
                            }
                            , 1000);
                        }
                    }}>Sign Up</StyledButton>
                </StyledForm>
                <StyledLink to="/">
                    <p>Switch back to log in</p>
                </StyledLink>
            </StyledRight>
        </StyledPage>
    );
}

const StyledPage = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	@media (max-width: 880px) {
		flex-direction: column;
	}
`;

const StyledLeft = styled.div`
	color: #ffffff;
	background-color: #151515;
	width: calc(100vw - 545px);
	height: 100%;
	box-sizing: border-box;
	box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
	@media (max-width: 880px) {
		height: 300px;
		width: 100vw;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	@media (max-width: 375px) {
		width: 375px;
		max-height: 175px;
		min-height: 175px;
		padding: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	h1 {
		font-family: "Passion One", cursive;
		font-size: 106px;
		line-height: 116px;
		font-weight: 700;
		margin-left: 100px;
		margin-top: calc(50vh - 150px);
		@media (max-width: 1110px) {
            margin-left: 70px;
			font-size: 76px;
			line-height: 76px;
		}
		@media (max-width: 880px) {
            margin-left: 0px;
			margin-top: 80px;
			font-size: 76px;
			line-height: 76px;
			margin-top: 10px;
		}
	}

	h2 {
		font-family: "Oswald", cursive;
		font-size: 43px;
		font-weight: 700;
		line-height: 63px;
		margin-left: 100px;
		width: 442px;
		height: 128px;
		@media (max-width: 1110px) {
			margin-left: 70px;
			font-size: 23px;
			line-height: 34px;
			width: 237px;
		}
		@media (max-width: 880px) {
			font-size: 23px;
			line-height: 34px;
			height: 68px;
            margin-left: 0px;
		}
	}
`;

const StyledRight = styled.div`
	width: 545px;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	@media (max-width: 880px) {
		width: 100vw;
		justify-content: flex-start;
		margin-top: 30px;
	}
	@media (max-width: 375px) {
		width: 375px;
	}
`;

const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	padding-left: 15px;
	padding-right: 15px;
	margin-top: 50px;
	@media (max-width: 880px) {
		margin-top: 0px;
	}

	input {
		width: 100%;
		max-width: 429px;
		height: 65px;
		border-radius: 6px;
		border: none;
		text-indent: 17px;
		margin-bottom: 13px;
		font-size: 27px;
		line-height: 40px;
		font-weight: 700;
		font-family: "Oswald", cursive;
		&::placeholder {
			color: #9f9f9f;
		}

		@media (max-width: 550px) {
			height: 55px;
			margin-bottom: 11px;
			font-size: 22px;
			line-height: 32.6px;
		}
	}
`;

const StyledButton = styled.button`
	color: #ffffff;
	font-size: 27px;
	font-weight: 700;
	line-height: 70px;
	text-align: center;
	background-color: #1877f2;
	width: 100%;
	max-width: 429px;
	height: 65px;
	border-radius: 6px;
	border: none;
	margin-bottom: 22px;
	font-family: "Oswald", cursive;
	display: flex;
	justify-content: center;
	align-items: center;

	&:disabled {
		opacity: 0.7;
	}

	@media (max-width: 550px) {
		height: 55px;
		font-size: 22px;
		line-height: 32.6px;
	}
`;

const StyledLink = styled(Link)`
	color: #ffffff;
	font-family: "Lato";
	font-size: 20px;
	font-weight: 400;
	line-height: 24px;

	@media (max-width: 550px) {
		font-size: 17px;
		line-height: 20.4px;
        margin-bottom: 30px;
	}
`;
