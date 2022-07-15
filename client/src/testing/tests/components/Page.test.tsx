import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import { MetaTags, Page } from '../../../components/Page';

describe('page wrapper', () => {
    let container: HTMLElement, rerender: any;

    const mockMeta: MetaTags = {
        title: 'Mock Title',
        description: 'Mock description.',
    };

    beforeEach(() => {
        const rendered = render(
            <HelmetProvider>
                <BrowserRouter>
                    <Page meta={mockMeta}>
                        <p>child</p>
                    </Page>
                </BrowserRouter>
            </HelmetProvider>
        );
        [container, rerender] = [rendered.container, rendered.rerender];
    });

    it('should not render header or footer when showHeader & showFooter = false', () => {
        // initially present
        const els = container.querySelectorAll('header, footer');
        els.forEach((el) => expect(el).toBeInTheDocument());

        // not present after prop changes
        rerender(
            <HelmetProvider>
                <BrowserRouter>
                    <Page meta={mockMeta} showHeader={false} showFooter={false}>
                        <p>child</p>
                    </Page>
                </BrowserRouter>
            </HelmetProvider>
        );
        els.forEach((el) => expect(el).not.toBeInTheDocument());
    });

    it('should render children', () => {
        expect(screen.getByText(/child/i)).toBeInTheDocument();
    });
});
