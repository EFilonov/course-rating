import {HamburgerProps} from "./Hamburger.props";
import {JSX} from "react";
import cn from "classnames";
import style from "./Hamburger.module.css";

const Hamburger = ({ className, active = false }: HamburgerProps): JSX.Element => {
    return (
        <button
            className={cn(style.hamburger, { [style.active]: active }, className)}
            type="button"
        >
            <span></span>
            <span></span>
            <span></span>
        </button>
    );
};

export default Hamburger;