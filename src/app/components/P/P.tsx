import {PProps} from "./P.props";
import {JSX} from "react";
import style from './p.module.css';

const P = ({ fontSize = 'regular', children }: PProps): JSX.Element  => {
    return (
        <p className={style[fontSize]}>
            {children}
        </p>    
    );
};

export default P;