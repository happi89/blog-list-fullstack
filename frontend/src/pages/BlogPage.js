import { useRef } from 'react';
import BlogList from '../components/BlogList';
import BlogForm from '../components/BlogForm';
import Toggable from '../components/Toggable';

const BlogPage = ({ blogs, setBlogs }) => {
	const blogFormRef = useRef(null);

	const blogForm = () => (
		<Toggable buttonLabel='Add Blog' ref={blogFormRef}>
			<BlogForm blogFormRef={blogFormRef} setBlogs={setBlogs} blogs={blogs} />
		</Toggable>
	);

	return (
		<div className='flex flex-col items-center'>
			{/* <Notification message={success} type={type} /> */}
			<h1 className='text-4xl font-bold my-3'>Blogs</h1>
			{blogForm()}
			<BlogList blogs={blogs} />
		</div>
	);
};

export default BlogPage;
