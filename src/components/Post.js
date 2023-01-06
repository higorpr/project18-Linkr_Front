import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProjectContext from "../constants/Context";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


export default function Post(){
    
    const [post, setPost] = useState({text:"", link:""});
    const [click, setClick] = useState(false);
    const { user, setUser } = useContext(ProjectContext);
    const navigate = useNavigate();

    function formHandler(e){
        const {name, value} = e.target;
        setPost({...post, [name]:value})
    }

    function sendPostToBd(e){
        e.preventDefault();
        setClick(true);

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
            setPost({text:"", link:""})
            setClick(false);
            navigate('/timeline');
        })
        .catch((err)=>{
            console.log(err); 
            setClick(false);       
        })
    }

    return (<StyledPost>
        <div>
            <img src={user.photo} alt=""/>
            <p>What are you going to share today?</p>
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
                {
                    click? 
                        <button type="submit" disabled={true} style={{backgroundColor:'#777'}}>Publishing</button>
                        :
                        <button type="submit" disabled={false}>Publish</button>
                }
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
    p{
        margin-top: 21px;
        font-size: 20px;
        font-weight: 300;
        color: #707070;
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
        font-size: 15px;
        font-weight: 300;
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