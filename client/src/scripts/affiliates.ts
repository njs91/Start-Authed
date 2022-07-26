import { getCookie } from '../utils/HelperFunctions';

export const setAffiliateCookies = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const referrer = urlParams.get('referrer');
    const cookieExists = Boolean(getCookie('referrer')); // to only credit initial referrer

    if (!referrer || cookieExists) return;

    const expiryDate = new Date(new Date().setFullYear(new Date().getFullYear() + 1)); // 1 year from now
    document.cookie = `referrer=${referrer}; expires=${expiryDate.toUTCString()};`;
};
