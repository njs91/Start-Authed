describe('homepage', () => {
    // before(() => {
    //     cy.exec('npm start');
    // });

    it('successfully loads homepage', () => {
        cy.visit('/');
    });
});
