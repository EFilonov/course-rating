import {DividerProps} from "./Divider.props";
import {JSX} from "react";

import cn from 'classnames';
import style from './Divider.module.css';

const Divider = ({className}: DividerProps): JSX.Element  => {
    return (
        <hr className={cn(className, style.hr)}/>
    );
};

export default Divider;