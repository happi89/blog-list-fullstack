import React, { useState } from 'react';
import userService from '../services/user';

const SignUpForm = ({ setSuccess, setType }) => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await userService.addUser({ username, password, name });
			setName('');
			setUsername('');
			setPassword('');
		} catch (err) {
			setTimeout(() => {
				setSuccess(null);
			}, 5000);
			setType('error');
			setSuccess('invalid or missing properties');
		}
	};

	return (
		<form onSubmit={onSubmit}>
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
					<span className='label-text'>Name</span>
				</label>
				<input
					className='input input-bordered w-full max-w-xs'
					type='text'
					name='Name'
					id='name'
					value={name}
					onChange={({ target }) => setName(target.value)}
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

// LoginForm.propTypes = {
// 	setUser: PropTypes.func.isRequired,
// 	setColor: PropTypes.func.isRequired,
// 	setSuccess: PropTypes.func.isRequired,
// };

export default SignUpForm;
