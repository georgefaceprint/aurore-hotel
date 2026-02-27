import createNextIntlPlugin from 'next-intl/plugin';
import withPWAInit from "@ducanh2912/next-pwa";

const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    // Register is true by default
    // SkipWaiting is true by default
    workboxOptions: {
        disableDevLogs: true,
    }
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withNextIntl(withPWA(nextConfig));
