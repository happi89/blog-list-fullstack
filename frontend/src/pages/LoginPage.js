import { useState } from 'react';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import Notification from '../components/Notification';

const LoginPage = ({ setUser }) => {
	const [success, setSuccess] = useState(null);
	const [type, setType] = useState(null);

	return (
		<div className='flex flex-col items-center p-6'>
			<Notification message={success} type={type} />
			<div>
				<h3 className='text-center font-bold text-2xl my-6'>Login</h3>
				<LoginForm
					setType={setType}
					setUser={setUser}
					setSuccess={setSuccess}
				/>
			</div>
			<h3 className='text-center font-bold text-2xl my-6'>Sign Up</h3>
			<div>
				<SignUpForm setType={setType} setSuccess={setSuccess} />
			</div>
		</div>
	);
};

export default LoginPage;
