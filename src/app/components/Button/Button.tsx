import {ButtonProps} from "./Button.props";
import {JSX} from "react";
import style from './Button.module.css';
import cn from 'classnames';

const Button = ({ appearance, children }: ButtonProps): JSX.Element  => {
    return (
        <button className={cn(style.button, {
            [style.blue]: appearance === 'blue',
            [style.gray]: appearance === 'gray'
        })}>
            {children}
        </button>
    );
};

export default Button;