
import type { ReactNode } from 'react';
import type { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Eugene Next.js App',
    description: 'A Next.js application with custom fonts and themes.',
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    
    return (
        <html suppressHydrationWarning lang='en'>
            {children}
        </html>
    );
};

export default Layout;
