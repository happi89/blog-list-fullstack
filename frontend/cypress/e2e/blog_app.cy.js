/* eslint-disable no-undef */
describe('Blog app', function () {
	beforeEach(function () {
		cy.visit('http://localhost:3000');
	});

	it('login form is displayed', function () {
		cy.contains('Username');
		cy.contains('Password');
		cy.contains('login');
	});

	it('fails with wrong credentials', function () {
		cy.visit('http://localhost:3000');
		cy.get('#username').type('happi892');
		cy.get('#password').type('password');
		cy.contains('login').click();
		cy.get('#notification').contains('Invalid username or password');
	});

	it('succeeds with correct credentials', function () {
		cy.contains('login').click();
		cy.get('#username').type('happi89');
		cy.get('#password').type('password');
		cy.get('#login-button').click();

		cy.contains('logged in user farhaan');
	});

	describe('when logged in', function () {
		beforeEach(function () {
			cy.contains('login').click();
			cy.get('input:first').type('happi89');
			cy.get('input:last').type('password');
			cy.get('#login-button').click();
		});

		it('a new note can be created', function () {
			cy.contains('Add Blog').click();
			cy.get('#title').type('a blog created by cypress');
			cy.get('#author').type('cypress');
			cy.get('#url').type('http://localhost:3000');
			cy.get('#add-blog').click();
			cy.contains('a blog created by cypress');
		});

		it('user can like blog', function () {
			cy.contains('Show More').click();
			cy.contains('Like').click();
		});

		it('user can delte blog if they created it', function () {
			cy.contains('Show More').click();
			cy.contains('delete').click();
			cy.contains('a blog created by cypress').should('not.exist');
		});
	});
});
