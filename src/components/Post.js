import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";


export default function Post(){
    
    const [post, setPost] = useState({text:"", link:""});

    function formHandler(e){
        const {name, value} = e.target;
        setPost({...post, [name]:value})
    }

    function sendPostToBd(e){
        e.preventDefault();

        const obj = {...post};

        const URL = `http://localhost:4000/publish`;

        const config = {
            headers: {
                Authorization: `Bearer 37802355-cf79-4fb1-8a35-f64445d23408` //${token}
            }
        }

        axios.post(URL, obj, config)
        .then((ans)=>{
            alert("Post realizado com sucesso!");
        })
        .catch((err)=>{
            console.log(err);         
        })
    }

    return (<StyledPost>
        <div>
            <img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/9802/production/_93741983_3cd04e7a-f975-4ccc-ad63-1e805136120b.jpg" alt=""/>
            <h1>What are you going to share today?</h1>
        </div>
            <FormStyle onSubmit={sendPostToBd}>
                <input 
                    name="link"
                    type="url"
                    value={post.link}
                    placeholder="http://..."
                    onChange={formHandler}
                    required
                />
                <input 
                    style={{height:'66px'}}
                    name="text"
                    type="text"
                    value={post.text}
                    placeholder="Awesome article about #javascript"
                    onChange={formHandler}
                />
                <button type="submit">Publish</button>
            </FormStyle>
    </StyledPost>);
}

const StyledPost = styled.div `
    width: 611px;
    height: 209px;

    background-color: #fff;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    border-radius: 16px;
    div{
        display: flex;
        flex-direction: row;
    }
    h1{
        margin-top: 21px; 
    }
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin: 16px 18px 0 18px;
    }

`
const FormStyle = styled.form `

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input, button{
        height: 30px;
        border-radius: 8px;
        border: none;
        margin: 2px 15px;
        align-self: flex-end;
    }
    input{
        width: 85%;
        background-color: #EFEFEF;
    }
    button{
        width: 150px;
        color: #fff;
        font-weight: 700;
        font-size: 14px;
        background-color: #1877F2;
        :hover{
            cursor: pointer;
            opacity: 0.8;
        }
    }
   
`