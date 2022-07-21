describe('login', () => {
    const user = {
        email: 'a@a.a',
        password: 'a',
        id: '62d1d8ec7ce7d45bfe3e9fc3',
    };
    const { email, password, id } = user;

    it('should redirect unauthenticated user to sign-in page', () => {
        cy.visit('/user/profile');
        cy.url().should('include', '/login');
    });

    it('should submit correctly, show loading, set cookies & redirect to profile', () => {
        cy.visit('/login');
        cy.get('input[name=email]').type(email);
        cy.get('input[name=password]').type(`${password}{enter}`);

        // should show loading image
        cy.get('img[alt=loading]').should('exist');

        // should redirect to user profile
        cy.url().should('include', '/user/profile');

        // should reflect being logged in
        cy.get('button').should('contain', 'Log out');
        cy.contains(email);
        cy.contains(id);

        // auth cookies should exist
        cy.getCookie('accountToken').should('exist');
        cy.getCookie('accountEmail').should('exist');
        cy.getCookie('accountId').should('exist');
    });

    // cy.request('POST', 'http://localhost:8000/api/user/login', { email, password });
});
