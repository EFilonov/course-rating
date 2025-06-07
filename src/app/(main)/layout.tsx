'use client';
import { use, type ReactNode } from 'react';
// import type { Metadata } from 'next';
import { Roboto} from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from './../components/Header/Header';
import { Sidebar } from './../components/Sidebar/Sidebar';
import { Footer } from './../components/Footer/Footer';

import './../globals.css';
import NavigationBar from '../(delete-this-and-modify-page.tsx)/NavigationBar';
import ThemeSwitch from '../(delete-this-and-modify-page.tsx)/ThemeSwitch';


const roboto = Roboto({
    subsets: ['cyrillic','latin'],
    variable: '--font-roboto',
    weight: ['100', '200', '300', '400', '500', '700', '900']});

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    

    return (
        
        <body className={`${roboto.variable}`}>
            <ThemeProvider>
                <Header/>
                <Sidebar/>
                    <main>
                        {children}
                    </main>
                <Footer/>
            </ThemeProvider>
        </body>
        
    );
};

export default Layout;
