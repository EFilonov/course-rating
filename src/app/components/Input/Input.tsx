import {InputProps} from "./Input.props";
import {JSX, ForwardedRef, forwardRef } from "react";

import cn from 'classnames';
import style from './Input.module.css';

const Input = forwardRef(({ className, validationMessage, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement> ): JSX.Element  => {
    return (
        <div className={cn(style.inputWrapper, className)}>
            <input className={style.input} {...props} ref={ref}/>
            <span className={style.validationMessage}>{validationMessage}</span>
        </div>    
    );
});

export default Input;