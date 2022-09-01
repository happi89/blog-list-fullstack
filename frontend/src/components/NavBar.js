import blogService from '../services/blog';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ user, setUser }) => {
	const navigate = useNavigate();

	const logout = (event) => {
		event.preventDefault();
		setUser(null);
		blogService.setToken(null);
		window.localStorage.clear();
		navigate('/');
	};
	return (
		<nav className='navbar bg-base-100 justify-between shadow-md gap-2 mb-4'>
			<div className=''>
				<a className='btn btn-ghost normal-case text-xl font-bold'>Blog List</a>
			</div>

			{user ? (
				<>
					<div className='btn-group'>
						<button
							className='btn btn-ghost text-xl'
							onClick={() => navigate('/users')}>
							All Users
						</button>
						<button
							className='btn btn-ghost text-xl'
							onClick={() => navigate('/blogs')}>
							Blogs
						</button>
					</div>
					<div className='flex-none gap-4 mr-4'>
						<p>user: {user.name}</p>
						<button className='btn btn-sm' onClick={logout} type='submit'>
							logout
						</button>
					</div>
				</>
			) : (
				' '
			)}
		</nav>
	);
};

export default NavBar;
