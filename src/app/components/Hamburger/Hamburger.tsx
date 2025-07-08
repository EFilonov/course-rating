import {HamburgerProps} from "./Hamburger.props";
import {JSX, useState} from "react";
import cn from "classnames";

import style from "./Hamburger.module.css";


const Hamburger = ({ className, onClick, active = false }: HamburgerProps): JSX.Element => {
    return (
        <button
            className={cn(style.hamburger, { [style.active]: active }, className)}
            type="button"
            onClick={onClick}
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default Hamburger;