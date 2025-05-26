import {ButtonProps} from "./Button.props";
import {JSX} from "react";
import style from './Button.module.css';
import cn from 'classnames';
import Arrow from './arrow.svg';


const Button = ({ appearance, children, className, arrow = 'none', ...props }: ButtonProps): JSX.Element  => {
    return (
        <>
        <button className={cn(style.button, className, 
            {
                [style.blue]: appearance === 'blue',
                [style.gray]: appearance === 'gray'
            })}
            {...props}
            >

            {children}
            {arrow !== 'none' && <span className={cn(style.arrow, { //if arrow === 'right') {
                [style.down]: arrow === 'down',
            })}>
                <Arrow /> 
            </span>}
              
        </button></>
    );
};

export default Button;