export const formatDate = (date: string): string => {
    const actualDate = new Date(date);
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(actualDate);
    const month = new Intl.DateTimeFormat('en', {
        month: '2-digit',
    }).format(actualDate);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(actualDate);

    return `${day}/${month}/${year}`;
};

export const formatTime = (date: string): string => {
    const actualDate = new Date(date);
    const hour = new Intl.DateTimeFormat('en', {
        hour: 'numeric',
        hour12: false,
    }).format(actualDate);
    const minute = new Intl.DateTimeFormat('en', { minute: 'numeric' }).format(actualDate);

    return `${hour}:${minute}`;
};

export const capitalise = (str: string): string => {
    if (!str.length) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const debounce = (fn: () => {}, timeout: number = 300) => {
    let timer: ReturnType<typeof setTimeout>;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, timeout);
    };
};

export const asyncDebounce = (fn: () => {}, wait: number, callFirst: any) => {
    var timeout: any;
    return function () {
        return new Promise(async (resolve) => {
            if (!wait) {
                // @ts-ignore
                const result = await fn.apply(this, arguments);
                resolve(result);
            }

            // @ts-ignore
            var context = this;
            // @ts-ignore
            var args = arguments;
            var callNow = callFirst && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(async function () {
                timeout = null;
                if (!callNow) {
                    // @ts-ignore
                    const result = await fn.apply(context, args);
                    resolve(result);
                }
            }, wait);

            if (callNow) {
                // @ts-ignore
                const result = await fn.apply(this, arguments);
                resolve(result);
            }
        });
    };
};

export const getCookie = (name: string): string | null =>
    document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || null;

// note: when cookies deleted, they may not show in the browser tab until you switch tabs and back again
// if the deleted cookies' paths aren't /, they may not work
export const deleteCookies = (names: string[]): void => {
    names.forEach((name: string) => {
        if (getCookie(name)) {
            document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
        }
    });
};
