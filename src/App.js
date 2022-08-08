import { BlogForm } from './components/BlogForm';
import { useState, useEffect } from 'react';
import Blog from './components/Blogs';
import blogService from './services/blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [success, setSuccess] = useState(null);
	const [color, setColor] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedInUserJson = window.localStorage.getItem('loggedInUser');
		if (loggedInUserJson) {
			const user = JSON.parse(loggedInUserJson);
			setUser(user);
			blogService.setToken(user.token);
		}
	}, []);

	const logout = (event) => {
		event.preventDefault();
		setUser(null);
		blogService.setToken(null);
		window.localStorage.clear();
	};

	const addBlog = (newBlog) => {
		blogService
			.addBlog(newBlog)
			.then((newBlog) => blogs.concat(newBlog))
			.then(() => {
				setTimeout(() => {
					setSuccess(null);
				}, 5000);
				setColor('green');
				setSuccess(`Blog ${newBlog.title} by ${newBlog.author} has been added`);
			})
			.catch((error) => {
				setColor('red');
				setTimeout(() => {
					setSuccess(null);
				}, 5000);
				setSuccess('Could not add blog');
			});
	};

	return (
		<>
			{user === null ? (
				<>
					<Notification message={success} color={color} setColor={setColor} />
					<LoginForm
						setColor={setColor}
						setUser={setUser}
						setSuccess={setSuccess}
					/>
				</>
			) : (
				<div>
					<h2>blogs</h2>
					<Notification message={success} color={color} />
					<p>logged in user {user.name}</p>
					<button onClick={logout} type='submit'>
						logout
					</button>
					<BlogForm createBlog={addBlog} />
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}{' '}
				</div>
			)}
		</>
	);
};

export default App;
