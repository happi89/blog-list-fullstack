import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
// import { element } from 'prop-types';

test('renders blog title and author', () => {
	const blog = {
		title: 'testing with jests',
		url: 'http://localhost:3000',
		author: 'farhaan',
	};

	render(<Blog blog={blog} />);

	screen.debug();

	const element = screen.getAllByText('testing with jests by farhaan');
	expect(element).toBeDefined();
});

test('clicking the button calls event handler once', async () => {
	const blog = {
		title: 'testing with jests2',
		url: 'http://localhost:3000',
		author: 'farhaan',
	};

	const mockHandler = jest.fn();

	render(<Blog blog={blog} addLike={mockHandler} />);

	const user = userEvent.setup();
	const button = screen.getByText('Like');
	await user.click(button);
	await user.click(button);

	expect(mockHandler.mock.calls).toHaveLength(2);
});

// test('blog url and numbe of likes is shown after show more is clicked', async () => {
// 	const blog = {
// 		title: 'testing with jests3',
// 		url: 'http://localhost:3000',
// 		author: 'farhaan',
// 	};

// 	const mockHandler = jest.fn();

// 	render(<Blog blog={blog} addLike={mockHandler} />);

// 	const user = userEvent.setup();
// 	const button = screen.getByText('Show More');
// 	await user.click(button);

// 	const likes = screen.getAllByText('Likes');
// 	expect(likes).toBeDefined();

// 	// const url = screen.getAllByText('http://localhost:3000');
// 	// expect(url).toBeDefined();
// });
