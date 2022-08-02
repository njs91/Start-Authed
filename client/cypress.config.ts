import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            //     // implement node event listeners here
            //     on('before:run', () => {
            //         console.log('before../?');
            //         cy.exec('npm start');
            //     });
            //     on('after:run', () => {
            //         console.log('after../?');
            //         cy.exec('kill $(lsof -t -i:3000)');
            //     });
            // },
        },
        baseUrl: 'http://localhost:3000',
        // experimentalInteractiveRunEvents: true,
        video: false,
    },
});
