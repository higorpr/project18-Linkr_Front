import axios from "axios";
import { useEffect, useState } from "react";
import { OnePost } from "./OnePost";

export function Posts() {
	const [post, setPost] = useState([]);
	useEffect(() => {
		const Url = "http://localhost:4000/posts";
		const config = {
			headers: {
				authorization: `Bearer 37802355-cf79-4fb1-8a35-f64445d23408`,
			},
		};

		axios
			.get(Url, config)
			.then((answer) => {
				setPost(answer.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<>
			{post.map((item) => (
				<OnePost item={item} />
			))}
		</>
	);
}
