import axios from 'axios';
const baseUrl = '/api/users';

const addUser = async (info) => {
	const response = await axios.post(baseUrl, info);
	return response.data;
};

export default { addUser };
