import loginService from '../services/login';
import blogService from '../services/blog';
import React, { useState } from 'react';

const LoginForm = ({ setUser, setColor, setSuccess }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
		} catch (err) {
			console.log(err);
			setColor('red');
			setTimeout(() => {
				setSuccess(null);
			}, 5000);
			setSuccess('Invalid username or password');
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				Username
				<input
					type='text'
					name='Username'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				Password
				<input
					type='password'
					name='Password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit'>login</button>
		</form>
	);
};

export default LoginForm;
