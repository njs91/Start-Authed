import { render, screen } from '@testing-library/react';
import { Error, Loading, Success } from '../../../../components/default/States';

describe('error component', () => {
    let container: HTMLElement, rerender: any;

    beforeEach(() => {
        const rendered = render(<Error msg={'Error found'} />);
        [container, rerender] = [rendered.container, rendered.rerender];
    });

    it('should render message', () => {
        const message = screen.getByText(/error found/i);

        expect(message).toBeInTheDocument();
    });

    it('should render class names', () => {
        const initialClasses = 'situationText error';
        const wrappingElement = container.firstChild;

        expect(wrappingElement).toHaveClass(initialClasses);
        rerender(<Error msg={'Error found'} cls='testcls' marginTop={true} />);
        expect(wrappingElement).toHaveClass(`${initialClasses} testcls marginTop`);
    });

    it('should render icon', () => {
        const icon = container.querySelector("svg[data-icon='triangle-exclamation']");

        expect(icon).toBeInTheDocument();
    });
});

describe('success component', () => {
    let container: HTMLElement, rerender: any;

    beforeEach(() => {
        const rendered = render(<Success msg={'Success message'} />);
        [container, rerender] = [rendered.container, rendered.rerender];
    });

    it('should render message', () => {
        const message = screen.getByText(/success message/i);

        expect(message).toBeInTheDocument();
    });

    it('should render class names', () => {
        const initialClasses = 'situationText success';
        const wrappingElement = container.firstChild;

        expect(wrappingElement).toHaveClass(initialClasses);
        rerender(<Success msg={'Success message'} cls='testcls' marginTop={true} />);
        expect(wrappingElement).toHaveClass(`${initialClasses} testcls marginTop`);
    });

    it('should render icon', () => {
        const icon = container.querySelector("svg[data-icon='circle-check']");

        expect(icon).toBeInTheDocument();
    });
});

describe('loading component', () => {
    let container: HTMLElement, rerender: any;

    beforeEach(() => {
        const rendered = render(<Loading />);
        [container, rerender] = [rendered.container, rendered.rerender];
    });

    it('should render image', () => {
        const image = screen.getByAltText('loading');

        expect(image).toBeInTheDocument();
    });

    it('should render class names', () => {
        const wrappingElement = container.firstChild;

        // expect(wrappingElement).toHaveClass(''); // should be empty classlist
        rerender(<Loading clsOuter='outerclass' />);
        expect(wrappingElement).toHaveClass('outerclass');
    });
});
