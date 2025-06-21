import {CardProps} from "./Card.props";
import {ForwardedRef, forwardRef, JSX} from "react";

import cn from 'classnames';
import style from './Card.module.css';

const Card = forwardRef(({ className, color = 'white', children, ...props }: CardProps, ref: ForwardedRef <HTMLFormElement>): JSX.Element  => {
    return (
        <div className={cn(className, style.card, {[style.lightBlue]: color === 'lightBlue' })} {...props} ref={ref}>
            {children}
            
        </div>    
    );
});

export default Card;