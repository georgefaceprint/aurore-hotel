
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !['en', 'bem', 'nya'].includes(locale)) {
        locale = 'en';
    }

    let messages;
    try {
        messages = (await import(`../messages/${locale}.json`)).default;
    } catch (error) {
        messages = (await import(`../messages/en.json`)).default;
    }

    return {
        locale,
        messages
    };
});
