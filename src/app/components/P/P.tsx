import {PProps} from "./P.props";
import {JSX} from "react";

import cn from 'classnames';
import style from './p.module.css';

const P = ({ fontSize = 'regular', className, children, ...props }: PProps): JSX.Element  => {
    return (
        <p className={cn(className, style[fontSize])}
            {...props}
        >

            {children}

        </p>    
    );
};

export default P;