// Front end
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { IoReload } from "react-icons/io5";
import { timelineUpdateUrl } from "../constants/urls";
import ProjectContext from "../constants/Context";
import "../styles/timelineUpdates.css";

export default function TimelineUpdate({ updatePosts, post, setPost, setLastPost }) {
	const { user } = useContext(ProjectContext);
	const [count, setCount] = useState(0);
	const [totalCount, setTotalCount] = useState(0);

	useEffect(() => {
		// Define the interval to get the count of new posts

		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};
		const interval = setInterval(() => {
			const request = axios.get(
				`${process.env.REACT_APP_API_BASE_URL}/timelineUpdate/${post[0].published_post_id}`,
				config
			);
			request.then((response) => {
				setCount(response.data.count);
			});
			request.catch((error) => {
			});
		}, 15000);
		return () => clearInterval(interval);
	}, [post]);

	useEffect(() => {
		setTotalCount(totalCount + count);
	}, [count]);

	const handleNewPosts = async () => {
		const config = {
			headers: {
				authorization: `Bearer ${user.token}`,
			},
		};

		const request = axios.get(
			`${timelineUpdateUrl}/${post[0].published_post_id}`,
			config
		);
		request.then((response) => {
            setLastPost(response.data.posts[0].published_post_id)
			setPost([...response.data.posts, ...post]);
		});
		request.catch((error) => {
			console.log(error);
		});
		setCount(0);
	};

	return (
		<>
			{count ? (
				<div className="timeline-update">
					<button onClick={handleNewPosts}>
						{count} new posts, load more! <IoReload />
					</button>
				</div>
			) : null}
		</>
	);
}
