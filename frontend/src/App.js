import { useState, useEffect } from 'react';
import blogService from './services/blog';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Users from './components/Users';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import NavBar from './components/NavBar';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

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
		}
		if (!loggedInUserJson) {
			navigate('/');
		}
	}, []);

	return (
		<>
			<NavBar user={user} setUser={setUser} />
			<Routes>
				<Route path='/' element={<LoginPage setUser={setUser} />} />
				<Route path='/users' element={<Users />} />
				<Route
					path='/blogs'
					element={<BlogPage blogs={blogs} setBlogs={setBlogs} />}
				/>
			</Routes>
		</>
	);
};

export default App;
