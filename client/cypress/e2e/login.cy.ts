describe('login', () => {
    beforeEach(function () {
        // "this" points at the test context object
        cy.fixture('user').then((user) => {
            // "this" is still the test context object
            this.user = user;
        });
    });

    it('should redirect unauthenticated user to sign-in page', () => {
        cy.visit('/user/profile');
        cy.url().should('include', '/login');
    });

    it('should submit correctly, show loading, set cookies & redirect to profile', function () {
        cy.visit('/login');
        cy.get('input[name=email]').type(this.user.email);
        cy.get('input[name=password]').type(`${this.user.password}{enter}`);

        // should show loading image
        cy.get('img[alt=loading]').should('exist');

        // should redirect to user profile
        cy.url().should('include', '/user/profile');

        // should reflect being logged in
        cy.get('button').should('contain', 'Log out');
        cy.contains(this.user.email);
        cy.contains(this.user.id);

        // auth cookies should exist
        cy.getCookie('accountToken').should('exist');
        cy.getCookie('accountEmail').should('exist');
        cy.getCookie('accountId').should('exist');
    });

    // cy.request('POST', 'http://localhost:8000/api/user/login', { email, password });
});
