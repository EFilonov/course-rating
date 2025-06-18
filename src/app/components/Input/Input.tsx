import {InputProps} from "./Input.props";
import {JSX} from "react";

import cn from 'classnames';
import style from './Input.module.css';

const Input = ({ className, ...props }: InputProps): JSX.Element  => {
    return (
        <input className={cn(className, style.input)} {...props}>
        </input>    
    );
};

export default Input;