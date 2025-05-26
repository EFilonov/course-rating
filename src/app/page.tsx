'use client';
// import HomePage from '@/app/(delete-this-and-modify-page.tsx)/HomePage';
import type { Metadata } from 'next';
import React, { use } from 'react';
import NavigationBar from '@/app/(delete-this-and-modify-page.tsx)/NavigationBar';
import Htag from './components/Htag/Htag';
import Button from './components/Button/Button';
import P from './components/P/P';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */

const Page = (): React.JSX.Element => {
    
    return <div>
        <NavigationBar />
        
        {/* <HomePage /> */}

        <Htag tag='h1'>Hello, World!</Htag>
        <Button appearance='blue' arrow = 'right'>Click Me</Button>
        <Button appearance='gray' arrow = 'down'>Click Me</Button>
        <P fontSize="small">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia, dolorem omnis explicabo aspernatur laboriosam architecto esse cum inventore debitis exercitationem ratione, tempora ex accusantium quam fugiat rem quia ullam earum?</P>
        
        
        <p>This is the main page of the application.</p>    
    </div>;
};

export default Page; 