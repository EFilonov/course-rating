import {TextAreaProps} from "./TextArea.props";
import {JSX} from "react";

import cn from 'classnames';
import style from './TextArea.module.css';

const TextArea = ({ className, ...props }: TextAreaProps): JSX.Element  => {
    return (
        <textarea className={cn(className, style.textarea)} {...props}/>
         
    );
};

export default TextArea;