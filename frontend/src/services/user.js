import axios from 'axios';
const baseUrl = '/api/users';

const addUser = async (info) => {
	const response = await axios.post(baseUrl, info);
	return response.data;
};

const getUsers = async () => {
	const res = await axios.get(baseUrl);
	return res.data;
};

const getUser = async (id) => {
	const res = await axios.get(`${baseUrl}/${id}`);
	return res.data;
};

export default { addUser, getUsers, getUser };
