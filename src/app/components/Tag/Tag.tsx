import {TagProps} from "./Tag.props";
import {JSX} from "react";

import cn from 'classnames';
import style from './Tag.module.css';


const Tag = ({href, ...props}: TagProps): JSX.Element  => {
    
    return (
        href ? <a href = {href}> <View {...props}/> </a> : <View {...props}/>
    );
};

 const View = ({size = 'regular', color = 'primary', className, children, ...props }: TagProps): JSX.Element => {
        return (
            <div className={cn(className, style.tag, style[size], style[color])}
                {...props}
            >
                {children}
            </div>
        );
    };

export default Tag;