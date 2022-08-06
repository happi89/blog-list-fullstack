import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');
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

	const handleLogin = async (event) => {
		event.preventDefault();
		console.log(username, password);
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

	const loginForm = () => (
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

	const logout = (event) => {
		event.preventDefault();
		setUser(null);
		blogService.setToken(null);
		window.localStorage.clear();
	};

	const blogForm = () => (
		<form onSubmit={HandleBlogSubmit}>
			<h1>Add Blog</h1>
			<div>
				title
				<input
					type='text'
					name='Title'
					value={title}
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author
				<input
					type='text'
					name='Author'
					value={author}
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url
				<input
					type='link'
					name='URL'
					value={url}
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type='submit'>Add</button>
		</form>
	);

	const HandleBlogSubmit = (event) => {
		event.preventDefault();
		const newBlog = {
			title,
			author,
			url,
		};

		blogService
			.addBlog(newBlog)
			.then(() => {
				blogService.getAll().then((blogs) => setBlogs(blogs));
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

		setTitle('');
		setAuthor('');
		setUrl('');
		blogService.getAll().then((blogs) => setBlogs(blogs));
	};

	return (
		<>
			{user === null ? (
				<>
					<Notification message={success} color={color} />
					{loginForm()}
				</>
			) : (
				<div>
					<h2>blogs</h2>
					<Notification message={success} color={color} />
					<p>logged in user {user.name}</p>
					<button onClick={logout} type='submit'>
						logout
					</button>
					{blogForm()}
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}{' '}
				</div>
			)}
		</>
	);
};

export default App;
