import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Toggable from './Toggable';
import Blog from './Blog';

describe('<Toggable />', () => {
	let container;

	const blog = {
		title: 'testing with jest',
		author: 'farhaan',
		url: 'http://localhost:3000',
	};

	beforeEach(() => {
		container = render(
			<Toggable buttonLabel='show...'>
				<Blog blog={blog} />
			</Toggable>
		).container;
	});

	test('renders its children', async () => {
		await screen.findAllByText('testing with jest by farhaan');
	});

	test('at start the children are not displayed', () => {
		const div = container.querySelector('.toggableContent');
		expect(div).toHaveStyle('display: none');
	});

	test('after clicking the button, children are displayed', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('show...');
		await user.click(button);

		const div = container.querySelector('.toggableContent');
		expect(div).not.toHaveStyle('display: none');
	});

	test('after clicking button, url and likes are displayed', async () => {
		const user = userEvent.setup();
		const button = screen.getByText('show...');
		await user.click(button);

		const url = screen.getByText('http://localhost:3000');
		const likes = screen.getByText('Likes:');
		expect(url).toBeDefined();
		expect(likes).toBeDefined();
	});
});
