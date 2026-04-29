import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: 'StackOne Hub Next.js Sandbox',
    description: 'SSR dev sandbox for @stackone/hub',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    margin: 0,
                    padding: '24px',
                    background: 'whitesmoke',
                }}
            >
                {children}
            </body>
        </html>
    );
}
