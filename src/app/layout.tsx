import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto} from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
    title: 'Eugene Next.js App',
    description: 'A Next.js application with custom fonts and themes.',
    openGraph: {
        title: 'Приложениие для оценки курсов',
        description: 'Читай отзывы, оцени курсы и делись своим мнением',
        images: [
            {
                url: 'https://evgens-rating.vercel.app/images/openGraph.png',
                width: 1200,
                height: 630,
                alt: 'Cource rating by Evgeniy Filonov'
            }
        ],
        url: 'https://evgens-rating.vercel.app/',
        type: 'website',
        siteName: 'Cource rating by Evgeniy Filonov',
        locale: 'ru_RU',
        
    },
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
