import { CreateAccountForm } from '../components/account/CreateAccountForm';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('create account tests', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <CreateAccountForm />
            </BrowserRouter>
        );
    });

    it('should render all inputs', () => {
        const inputs = [
            screen.getByRole('textbox', { name: 'Email:' }),
            screen.getByLabelText('Password:'),
            screen.getByLabelText('Re-enter Password:'),
            screen.getByRole('button', { type: 'submit' }),
        ];

        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render all labels', () => {
        const labels = document.querySelectorAll('form label');

        labels.forEach((label) => {
            expect(label).toBeInTheDocument();
        });
    });
});
