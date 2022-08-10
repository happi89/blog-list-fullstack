import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

test('<BlogForm /> calls the event handler prop with the right details when a new blog is created.', async () => {
	const createBlog = jest.fn();
	const user = userEvent.setup();

	render(<BlogForm createBlog={createBlog} />);

	const titleInput = screen.getByPlaceholderText('Title goes here...');
	const authorInput = screen.getByPlaceholderText('Author goes here...');
	const urlInput = screen.getByPlaceholderText('Url goes here...');
	const sendButton = screen.getByText('Add');

	await user.type(titleInput, 'testing a form');
	await user.type(authorInput, 'jest bot');
	await user.type(urlInput, 'http://localhost:3000/');
	await user.click(sendButton);

	screen.debug();

	expect(createBlog.mock.calls).toHaveLength(1);
	expect(createBlog.mock.calls[0][0].title).toBe('testing a form');
	expect(createBlog.mock.calls[0][0].author).toBe('jest bot');
	expect(createBlog.mock.calls[0][0].url).toBe('http://localhost:3000/');
});
