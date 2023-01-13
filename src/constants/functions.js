import axios from "axios";

export async function getLikesData(user, postId) {
	let usersStr;
	const url = `${process.env.REACT_APP_API_BASE_URL}/posts/likes/${postId}`;
	try {
		const response = await axios.get(url);
		const userArr = response.data;

		if (userArr.length > 2) {
			const remainingUsers = userArr.length - 2;
			if (userArr.includes(user.name)) {
				const userLiked =
					userArr[0] === user.name ? userArr[1] : userArr[0];

				usersStr = `You, ${userLiked} and other ${remainingUsers} people liked this post`;
			} else {
				usersStr = `${userArr[0]}, ${userArr[1]} and other ${remainingUsers} people liked this post`;
			}
		} else if (userArr.length === 2) {
			if (userArr.includes(user.name)) {
				const userLiked =
					userArr[0] === user.name ? userArr[1] : userArr[0];

				usersStr = `You and ${userLiked} liked this post`;
			} else {
				usersStr = `${userArr[0]} and ${userArr[1]} liked this post`;
			}
		} else if (userArr.length === 1) {
			if (userArr.includes(user.name)) {
				usersStr = `You liked this post`;
			} else {
				usersStr = `${userArr[0]} liked this post`;
			}
		} else {
			usersStr = "Be the first to like this post!";
		}
	} catch (err) {
		console.log(err);
	}

	return usersStr;
}
