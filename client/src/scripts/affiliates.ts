import { getCookie } from '../utils/HelperFunctions';

export const setAffiliateCookies: () => void = () => {
    const urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    const referrer: string | null = urlParams.get('referrer');
    const cookieExists: boolean = Boolean(getCookie('referrer')); // to only credit initial referrer

    if (!referrer || cookieExists) return;

    const expiryDate: Date = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // 1 year from now
    document.cookie = `referrer=${referrer}; expires=${expiryDate.toUTCString()};`;
};
