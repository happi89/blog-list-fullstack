import BlogForm from './components/BlogForm';
import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Toggable from './components/Toggable';
import SignUpForm from './components/SignUpForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [success, setSuccess] = useState(null);
	const [type, setType] = useState(null);

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
				setType('success');
				setSuccess(`Blog ${newBlog.title} by ${newBlog.author} has been added`);
			})
			.catch((error) => {
				setType('error');
				setTimeout(() => {
					setSuccess(null);
				}, 5000);
				setSuccess('Could not add blog', error);
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
			return (
				<button
					onClick={() => deleteBlog(blog)}
					className='btn btn-sm w-full btn-error mt-2'>
					delete
				</button>
			);
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
				<div className='flex flex-col items-center p-6'>
					<Notification message={success} type={type} />
					<h3 className='text-center font-bold text-2xl my-6'>Login</h3>
					<div>
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
			) : (
				<div className='flex flex-col items-center'>
					<nav className='navbar bg-base-100 shadow-md flex flex-row justify-center gap-2 mb-4'>
						<div className='flex-1'>
							<a className='btn btn-ghost normal-case text-xl font-bold'>
								Blog List
							</a>
						</div>
						<div className='flex-none gap-4 mr-4'>
							<p>user: {user.name}</p>
							<btn className='btn btn-sm' onClick={logout} type='submit'>
								logout
							</btn>
						</div>
					</nav>
					<Notification message={success} type={type} />
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
