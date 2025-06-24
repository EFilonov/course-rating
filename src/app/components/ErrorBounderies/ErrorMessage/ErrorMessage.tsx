import Image from 'next/image';
import React from 'react';

import style from './Error.module.css';

export const ErrorMessage = () : React.JSX.Element => {
    return (
        <img src = '/images/error.gif' alt = 'Loading error'
        className = {style.img}
        loading="lazy"/>
    );
};

