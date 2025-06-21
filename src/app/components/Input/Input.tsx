import {InputProps} from "./Input.props";
import {JSX, ForwardedRef, forwardRef } from "react";

import cn from 'classnames';
import style from './Input.module.css';

const Input = ({ className, validationMessage, ...props }: InputProps ): JSX.Element  => {
    return (
        <div className={cn(style.inputWrapper, className)}>
            <input className={style.input} {...props} />
            {validationMessage && <span className={style.validationMessage}>{validationMessage}</span>}
        </div>    
    );
};

export default Input;