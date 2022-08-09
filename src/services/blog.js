import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const addBlog = async (newBlog) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newBlog, config);
	return response.data;
};

const addLike = async (updatedBlog) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.put(
		`${baseUrl}/${updatedBlog.id}`,
		updatedBlog,
		config
	);
	return response.data;
};

const deleteBlog = async (blog) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
	return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, addBlog, addLike, deleteBlog };
