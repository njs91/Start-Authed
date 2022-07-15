import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HeroArea, Section } from '../../../../components/default/Areas';

describe('hero area', () => {
    let container: HTMLElement, rerender: any;

    beforeEach(() => {
        const rendered = render(
            <BrowserRouter>
                <HeroArea title='title' description='description' buttonText='click me' buttonLink='/url' />
            </BrowserRouter>
        );
        [container, rerender] = [rendered.container, rendered.rerender];
    });

    it('should render title & description', () => {
        const els: HTMLElement[] = [screen.getByRole('heading', { name: /title/i }), screen.getByText(/description/i)];
        els.forEach((el) => expect(el).toBeInTheDocument());
    });

    it('should render button with correct link & text', () => {
        const button: HTMLElement = screen.getByRole('link', { name: /click me/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('href', '/url');
    });

    it('should only render image when provided', () => {
        // default, without image
        let image: HTMLElement | null = screen.queryByRole('img', { name: /image alt/i });
        expect(image).not.toBeInTheDocument();

        rerender(
            <BrowserRouter>
                <HeroArea
                    image='/src'
                    imageAlt='image alt'
                    title='title'
                    description='description'
                    buttonText='click me'
                    buttonLink='/url'
                />
            </BrowserRouter>
        );

        // added image
        image = screen.getByRole('img', { name: /image alt/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/src');
        expect(image).toHaveAttribute('alt', 'image alt');
    });

    it('should render correct classes', () => {
        // default classes
        const [wrappingParent, wrappingChild]: Array<ChildNode | null | undefined> = [
            container.firstChild,
            container.firstChild?.firstChild,
        ];
        expect(wrappingParent).toHaveClass('outer heroAreaOuter');
        expect(wrappingChild).toHaveClass('inner heroAreaInner');

        rerender(
            <BrowserRouter>
                <HeroArea
                    image='/src'
                    imageAlt='image alt'
                    title='title'
                    description='description'
                    buttonText='click me'
                    buttonLink='/url'
                    clsOuter='outerclass'
                    clsInner='innerclass'
                    fullWidth={true}
                />
            </BrowserRouter>
        );

        // added classes
        expect(wrappingParent).toHaveClass('outer heroAreaOuter outerclass');
        expect(wrappingChild).toHaveClass('inner heroAreaInner fullWidth innerclass');
    });
});

describe('sections', () => {
    let container: HTMLElement, rerender: any, wrappingParent: ChildNode | null;

    beforeEach(() => {
        const rendered = render(
            <BrowserRouter>
                <Section>
                    <p>child</p>
                </Section>
            </BrowserRouter>
        );
        [container, rerender] = [rendered.container, rendered.rerender];
        wrappingParent = container.firstChild;
    });

    it('should render correct tag', () => {
        expect(wrappingParent?.nodeName).toBe('SECTION');

        rerender(
            <BrowserRouter>
                <Section tag='div'>
                    <p>child</p>
                </Section>
            </BrowserRouter>
        );

        wrappingParent = container.firstChild;
        expect(wrappingParent?.nodeName).toBe('DIV');
    });

    it('should render correct classes (inc. patterned)', () => {
        const wrappingChild: ChildNode | null | undefined = wrappingParent?.firstChild;

        // default classes
        expect(wrappingParent).toHaveClass('outer');
        expect(wrappingChild).toHaveClass('inner');

        rerender(
            <BrowserRouter>
                <Section clsOuter='outerclass' clsInner='innerclass' patterned={true}>
                    <p>child</p>
                </Section>
            </BrowserRouter>
        );

        // added classes
        expect(wrappingParent).toHaveClass('outer patterned outerclass');
        expect(wrappingChild).toHaveClass('inner innerclass');
    });

    it('should render children', () => {
        expect(screen.getByText(/child/i)).toBeInTheDocument();
    });
});
