import React, { useState, useEffect } from "react";
import { trendingUrl } from "../constants/urls";
import "../styles/TrendingBox.css";

export default function TrendingBox (){
    /*
export async function getHashtags(res, req){
    //  Get the  hashtags from the posts
    const findHashtags = await connection.query(` SELECT * FROM posts WHERE text LIKE '%#%' `);

    // Save the hashtags in a variable
    const hashtags = findHashtags.rows;

    // For each hashtag, insert with the name and the id
    hashtags.forEach(async (hashtag) => { 
        const [hashtagName] = (hashtag.text).split("#");
        const postHashtags = await connection.query(` INSERT INTO hashtags (id, name) VALUES ($1, $2) `, [hashtag.id, hashtagName]);
    });

    // Get the hashtags from the table hashtags
    const hashtagsFromHashtags = await connection.query(` SELECT * FROM hashtags `);

    return hashtagsFromHashtags.rows;
}
*/

    const [hashtags, setHashtags] = useState([]);

    useEffect(() => {
        fetch(trendingUrl)
        .then((res) => res.json())
        .then((data) => {
            setHashtags(data);
        })
    }
    , []);

    return (
        <div className="trending-box">
            <div className="trending-title">
                <h1>trending</h1>
            </div>
            <div className="trending-hashtags">
                <ul>
                    {hashtags.map((hashtag) => {
                        return (
                            
                                <li key={hashtag.id}>
                                    <a href={`/hashtag/${hashtag.name}`}>#{hashtag.name}</a>
                                </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}