import { Inter, Outfit } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Zambia Forward - Official Party Platform",
  description: "Join the movement for a better Zambia. Connect, Volunteer, and Lead.",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#008A4B",
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

import { UserProvider } from '@/context/UserContext';
// ...
export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <UserProvider>
            {children}
          </UserProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
