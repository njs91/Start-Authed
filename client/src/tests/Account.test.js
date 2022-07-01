import { CreateAccountForm } from '../components/account/CreateAccountForm';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('create account tests', () => {
    let inputs, labels;

    beforeEach(() => {
        render(
            <BrowserRouter>
                <CreateAccountForm />
            </BrowserRouter>
        );

        inputs = [
            screen.getByRole('textbox', { name: 'Email:' }),
            screen.getByLabelText('Password:'),
            screen.getByLabelText('Re-enter Password:'),
            screen.getByRole('button', { type: 'submit' }),
        ];
        labels = document.querySelectorAll('form label');
    });

    it('should render all inputs', () => {
        inputs.forEach((input) => {
            expect(input).toBeInTheDocument();
        });
    });

    it('should render all labels', () => {
        labels.forEach((label) => {
            expect(label).toBeInTheDocument();
        });
    });
});
