import loginService from '../services/login';
import blogService from '../services/blog';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setUser, setType, setSuccess }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			window.localStorage.setItem('loggedInUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
			navigate('/blogs');
		} catch (err) {
			setTimeout(() => {
				setSuccess(null);
			}, 5000);
			setType('error');
			setSuccess('Invalid username or password');
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<div>
				<label className='label'>
					<span className='label-text'>Username</span>
				</label>
				<input
					className='input input-bordered w-full max-w-xs'
					type='text'
					name='Username'
					id='username'
					value={username}
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				<label className='label'>
					<span className='label-text'>Password</span>
				</label>
				<input
					className='input input-bordered w-full max-w-xs'
					type='password'
					name='Password'
					id='password'
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type='submit' className='btn btn-primary btn-wide mt-4'>
				login
			</button>
		</form>
	);
};

LoginForm.propTypes = {
	setUser: PropTypes.func.isRequired,
	setColor: PropTypes.func.isRequired,
	setSuccess: PropTypes.func.isRequired,
};

export default LoginForm;
