import HomePage from '@/app/(delete-this-and-modify-page.tsx)/HomePage';
import type { Metadata } from 'next';
import React from 'react';
import NavigationBar from '@/app/(delete-this-and-modify-page.tsx)/NavigationBar';
import Htag from './components/Htag/Htag';
import Button from './components/Button/Button';


/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */

const Page = () => {

    

    // const [hovering, setHovering] = React.useState(false);

    return <div>
        <NavigationBar />
        {/* <HomePage /> */}

        <Htag tag='h1'>Hello, World!</Htag>
        <Button appearance='blue'>Click Me</Button>
        <Button appearance='gray'>Click Me</Button>
        <p>This is the main page of the application.</p>    
    </div>;
};

export default Page; 