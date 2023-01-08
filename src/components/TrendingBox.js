import React, { useState, useEffect } from "react";
import { hashtagUrl } from "../constants/urls";
import "../styles/TrendingBox.css";

function TrendingBox (){
    //Get the trending hashtags
    const [trendingHashtags, setTrendingHashtags] = useState([]);

    //Get the trending hashtags by name
    useEffect(() => {
        fetch(hashtagUrl, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => setTrendingHashtags(res.hashtags))
    }, []);


    return (
        <div className="trending-box">
            <div className="trending-title">
                <h1>trending</h1>
            </div>
            <div className="trending-hashtags">
                {/* Render the trending hashtags in order of popularity */}
                {trendingHashtags.map((hashtag, index) => {
                    return (
                        <div className="trending-hashtag" key={index}>
                            <p># {hashtag.name}</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default TrendingBox;