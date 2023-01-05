import { useState } from 'react';
import { useNavigate} from 'react-router-dom';


import './style.css';

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [image, setImage] = useState("");
    const [isEmpty, setIsEmpty] = useState(false);

    const navigate = useNavigate();

    async function handleSingUp(e) {
        e.preventDefault();
        
        fetch("http://localhost:4000/signup", {
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
        <div className="SingUp">
            <div className="leftSide">
                <h1>linkr</h1>
                <p>save, share and discover the best links on the web</p>
            </div>
            <div className="rightSide">
                <form onSubmit={handleSingUp}>
                    <input type="email" placeholder="e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <input type="url" placeholder="picture url" value={image} onChange={e => setImage(e.target.value)} />
                    <button type="submit" onClick={() => {
                        if(email === "" || password === "" || username === "" || image === ""){
                            setIsEmpty(true)}
                        else{
                            setTimeout(() => {
                                setIsEmpty(false);
                            }
                            , 1000);
                        }
                    }}>Sign Up</button>
                </form>
                <a href="/">Switch back to log in</a>
            </div>
        </div>
    );
}

export default SignUp;