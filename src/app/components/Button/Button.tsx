import {ButtonProps} from "./Button.props";
import {JSX} from "react";
import cn from 'classnames';
import Image from "next/image";

import style from './Button.module.css';

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
                <Image className={style.arrowIcon}
                    src="/icons/ButtonArrow/arrow.svg"
                    alt="arrow"
                    width={10}
                    height={10}
                    style={{color: 'inherit'}}
                    loading="lazy"/>
            </span>}
              
        </button></>
    );
};

export default Button;