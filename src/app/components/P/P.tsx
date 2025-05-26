import {PProps} from "./P.props";
import {JSX} from "react";
<<<<<<< HEAD
import cn from 'classnames';
import style from './p.module.css';

const P = ({ fontSize = 'regular', className, children, ...props }: PProps): JSX.Element  => {
    return (
        <p className={cn(className, style[fontSize])}
            {...props}
        >

            {children}
            
=======
import style from './p.module.css';

const P = ({ fontSize = 'regular', children }: PProps): JSX.Element  => {
    return (
        <p className={style[fontSize]}>
            {children}
>>>>>>> 1fad826fba0326cc2773ac5134b01ab3cfea5c61
        </p>    
    );
};

export default P;