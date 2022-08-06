import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const addBlog = async (newBlog) => {
	const config = {
		headers: {
			Authorization: token,
		},
	};

	const request = await axios.post(baseUrl, newBlog, config);
	return request.data;
};

export default { getAll, setToken, addBlog };
