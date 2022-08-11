import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users';

const addUser = async (info) => {
	const response = await axios.post(baseUrl, info);
	return response.data;
};

export default { addUser };
