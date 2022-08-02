describe('create account', () => {
    beforeEach(function () {
        cy.fixture('user').then((user) => {
            this.user = user;
        });
        cy.fixture('existing-user').then((existingUser) => {
            this.existingUser = existingUser;
        });
    });

    // skip
    xit('should fail to submit with existing user', async function () {
        // create user manually so that the test fails when trying to recreate existing user
        const res = await fetch('http://localhost:8000/api/user/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.existingUser.email,
                password: this.existingUser.password,
            }),
        });
        const data = await res.json();
        const { id } = data;

        // visit create account page
        cy.visit('/create-account');

        // submit with existing user
        cy.get('input[name=email]').type(this.existingUser.email);
        cy.get('input[name=password]').type(this.existingUser.password);
        cy.get('input[name=passwordConfirmation]').type(`${this.existingUser.password}{enter}`);

        // should show loading image
        cy.get('img[alt=loading]').should('exist');

        // should show error
        cy.contains('User already exists');

        // delete existingUser (cleanup)
        cy.then(async () => {
            // needed, otherwise runs at start of test, before checking whether cy.contains 'user already exists'
            // only sometimes works for some reason
            await fetch('http://localhost:8000/api/user/delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
        });
    });

    // it('should submit correctly with non-existing user', function () {
    //     cy.intercept('/api/user/login').as('id');

    //     // visit create account page
    //     cy.visit('/create-account');

    //     // submit with non-existing user
    //     cy.get('input[name=email]').type(this.user.email);
    //     cy.get('input[name=password]').type(this.user.password);
    //     cy.get('input[name=passwordConfirmation]').type(`${this.user.password}{enter}`);

    //     // should show loading image
    //     cy.get('img[alt=loading]').should('exist');

    //     //
    //     cy.wait('@id').then((intercept) => {
    //         // you can now access the request body, response body, status, ...
    //         console.log('intercept: ', intercept);
    //     });

    //     // should redirect to login
    //     cy.url().should('include', '/login');

    //     // delete added user (cleanup)
    //     // find ID - response.id?
    //     // delete using ID
    // });
});
