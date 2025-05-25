import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Roboto} from 'next/font/google';

import { ThemeProvider } from 'next-themes';

// import '@/app/globals.css';

import './globals.css';

const roboto = Roboto({
    subsets: ['cyrillic','latin'],
    variable: '--font-roboto',
    weight: ['100', '200', '300', '400', '500', '700', '900']});

// const roboto = localFont({
//     src: './fonts/RobotoAll.ttf',
//     variable: '--font-roboto',
//     weight: '100 900',
// });



export const metadata: Metadata = {
    title: 'My Next.js App',
    description: 'A Next.js application with custom fonts and themes.',
    
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        
        <html suppressHydrationWarning lang='en'>
            <body className={`${roboto.variable}`}>
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
