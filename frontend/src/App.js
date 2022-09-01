import { useState, useEffect } from 'react';
import blogService from './services/blog';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Users from './components/Users';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import NavBar from './components/NavBar';
import User from './components/User';
import userServices from './services/user';
import Blog from './components/Blog';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [users, setUsers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		blogService
			.getAll()
			.then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
	}, []);

	useEffect(() => {
		const loggedInUserJson = window.localStorage.getItem('loggedInUser');
		if (loggedInUserJson) {
			const user = JSON.parse(loggedInUserJson);
			setUser(user);
			blogService.setToken(user.token);
			navigate('/blogs');
		}
		if (!loggedInUserJson) {
			navigate('/');
		}
	}, []);

	useEffect(() => {
		userServices.getUsers().then((users) => setUsers(users));
	}, []);

	return (
		<>
			<NavBar user={user} setUser={setUser} />
			<Routes>
				<Route path='/' element={<LoginPage setUser={setUser} />} />
				<Route path='/users' element={<Users users={users} />} />
				<Route path='/users/:id' element={<User />} />
				<Route path='/blogs' element={<BlogPage blogs={blogs} />} />
				<Route
					path='/blogs/:id'
					element={<Blog blogs={blogs} setBlogs={setBlogs} user={user} />}
				/>
			</Routes>
		</>
	);
};

export default App;
