// import loginService from '../services/login';
// import blogService from '../services/blog';
import React, { useState } from 'react';
// import PropTypes from 'prop-types';

const SignUpForm = () => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	return (
		<form>
			<div>
				Username
				<input
					type='text'
					name='Username'
					id='username'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Name
				<input
					type='text'
					name='Name'
					id='name'
					value={name}
					onChange={({ target }) => setName(target.value)}
				/>
			</div>
			<div>
				Password
				<input
					type='password'
					name='Password'
					id='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit' id='login-button'>
				login
			</button>
		</form>
	);
};

// LoginForm.propTypes = {
// 	setUser: PropTypes.func.isRequired,
// 	setColor: PropTypes.func.isRequired,
// 	setSuccess: PropTypes.func.isRequired,
// };

export default SignUpForm;
