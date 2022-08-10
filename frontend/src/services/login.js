import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/login';

const login = async (info) => {
	const response = await axios.post(baseUrl, info);
	return response.data;
};

export default { login };
