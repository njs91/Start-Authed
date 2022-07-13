import { render, screen } from '@testing-library/react';
import { Error } from '../../../../components/default/States';

describe('error component', () => {
    it('should render message', () => {
        render(<Error msg={'Error found'} />);
        const message = screen.getByText(/error found/i);

        expect(message).toBeInTheDocument();
    });

    it('should render class names', () => {
        const { container, rerender } = render(<Error msg={'Error found'} />);
        const initialClasses = 'situationText error';
        const wrappingElement = container.firstChild;

        expect(wrappingElement).toHaveClass(initialClasses);
        rerender(<Error msg={'Error found'} cls='testcls' marginTop={true} />);
        expect(wrappingElement).toHaveClass(`${initialClasses} testcls marginTop`);
    });
});
