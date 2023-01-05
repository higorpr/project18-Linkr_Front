import axios from "axios";
import { useEffect } from "react";

export function Posts() {
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
				console.log(answer.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return <></>;
}
