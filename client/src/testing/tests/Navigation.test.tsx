import { Header, links, LinkType } from '../../components/Header';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar links', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
    });

    it('should render links properly', () => {
        links.forEach(({ title, url }: LinkType): void => {
            expect(screen.getByText(title)).toHaveAttribute('href', url);
        });
    });

    it('should fail', () => {
        expect(false).toBe(true);
    });

    // @todo: also test that it renders Login button when not logged in
    // @todo: also test that it renders Log out button when logged in
});
