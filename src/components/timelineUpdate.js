// Front end
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { timelineUpdateUrl } from "../constants/urls";
import ProjectContext from "../constants/Context";
import "../styles/timelineUpdates.css";

export default function TimelineUpdate({ updatePosts }) {
    const { user } = useContext(ProjectContext);
    const [count, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        // Define the interval to get the count of new posts
        const interval = setInterval(() => {
            const request = axios.get(timelineUpdateUrl);
            request.then((response) => {
                setCount(response.data.count);
                // console.log(response.data.count);
                // console.log("15 sec passed");
            });
            request.catch((error) => {
                // console.log(error);
            });
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTotalCount(totalCount + count);
    }, [count]);


    const handleNewPosts = async () => {
        setCount(0);
        setTotalCount(0);
    
        const newPosts = await axios.get(timelineUpdateUrl);
        updatePosts(newPosts.data);
    }

    return (
        <>
            <div className="timeline-update">
                <button onClick={ handleNewPosts }>{ totalCount } new posts, load more! <IoReload /></button>
            </div>
        </>
    );
}