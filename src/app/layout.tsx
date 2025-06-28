
import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto} from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
    title: 'Eugene Next.js App',
    description: 'A Next.js application with custom fonts and themes.',
};

const roboto = Roboto({
    subsets: ['cyrillic','latin'],
    variable: '--font-roboto',
    weight: ['100', '200', '300', '400', '500', '700', '900']});

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    
    return (
        <html suppressHydrationWarning lang='ru'>
             <body className={`${roboto.variable}`}>
                {children}
            </body>
        </html>
    );
};

export default Layout;
