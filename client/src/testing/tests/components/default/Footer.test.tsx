import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer, footerLinks } from '../../../../components/Footer';
import { LinkType } from '../../../../components/Header';

describe('footer', () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date('2023-01-03')); // creates fake date for testing year

        render(
            <BrowserRouter>
                <Footer />
            </BrowserRouter>
        );
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('should render links properly', () => {
        footerLinks.forEach(({ title, url }: LinkType): void => {
            expect(screen.getByText(title)).toHaveAttribute('href', url);
        });
    });

    it('should contain copyright info: copyright symbol, holder, year and all rights reserved', () => {
        const copyright = screen.getByText(/©/i);
        const holder = screen.getByText(new RegExp(window.location.host));
        const year = screen.getByText(/2021 - 2023/i);
        const rights = screen.getByText(/all rights reserved/i);

        [copyright, holder, year, rights].forEach((el: HTMLElement): void => expect(el).toBeInTheDocument());
    });
});
