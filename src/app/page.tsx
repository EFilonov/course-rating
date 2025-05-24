// import HomePage from '@/app/(delete-this-and-modify-page.tsx)/HomePage';
"use server";
import React from 'react';
import cn from 'classnames';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {

    const aasdasd:number = 5; // Example variable to demonstrate TypeScript usage

    // const [hovering, setHovering] = React.useState(false);

    return <div 
        // onMouseOver={() => setHovering(true)}
        // onMouseOut={() => setHovering(false)} 
        // className={cn('container', {'mx-auto': hovering}, 'p-4')}
        >
        <h1>Welcome to the Home Page !!!{aasdasd}</h1>
        {/* Uncomment the line below to include the HomePage component */}
        {/* <HomePage /> */}
        <p>This is the main page of the application.</p>    
    </div>;
};

export default Page; 