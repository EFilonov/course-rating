'use client';
import {type ReactNode } from 'react';
// import type { Metadata } from 'next';

import { ThemeProvider } from 'next-themes';
import { Header } from './../components/Header/Header';
import { Sidebar } from './../components/Sidebar/Sidebar';
import { Footer } from './../components/Footer/Footer';
import Up from '../components/Up/Up';



const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    
    return (
       <ThemeProvider>
            <Header/>
                <Sidebar/>
                <main>
                    {children}
                </main>
            <Footer/>
            <Up/>
        </ThemeProvider>
    );
};

export default Layout;
