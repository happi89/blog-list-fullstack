import BlogForm from './components/BlogForm';
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blogs';
import blogService from './services/blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [success, setSuccess] = useState(null);
	const [color, setColor] = useState(null);

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
	}, []);

	const logout = (event) => {
		event.preventDefault();
		setUser(null);
		blogService.setToken(null);
		window.localStorage.clear();
	};

	const blogFormRef = useRef(null);

	const addBlog = (newBlog) => {
		blogFormRef.current.toggleVisibility();
		blogService
			.addBlog(newBlog)
			.then((newBlog) => {
				setBlogs(blogs.concat(newBlog));
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

	const addLike = (blog) => {
		const updatedBlog = {
			...blog,
			likes: (blog.likes += 1),
		};
		blogService.addLike(updatedBlog).then((updatedBlog) => {
			setBlogs(
				blogs
					.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
					.sort((a, b) => b.likes - a.likes)
			);
		});
	};

	const showDeleteButton = (blog) => {
		if (user.username === blog.user.username) {
			return <button onClick={() => deleteBlog(blog)}>delete</button>;
		}
	};

	const deleteBlog = (blogToDelete) => {
		if (
			window.confirm(
				`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
			)
		) {
			blogService
				.deleteBlog(blogToDelete)
				.then(setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id)));
		}
	};

	const blogForm = () => (
		<Toggable buttonLabel='Add Blog' ref={blogFormRef}>
			<BlogForm createBlog={addBlog} />
		</Toggable>
	);

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
					{blogForm()}
					{blogs.map((blog) => (
						<Blog
							blog={blog}
							addLike={addLike}
							deleteBlog={deleteBlog}
							showDeleteButton={showDeleteButton}
							key={blog.id}
						/>
					))}{' '}
				</div>
			)}
		</>
	);
};

export default App;
