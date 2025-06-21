import {TextAreaProps} from "./TextArea.props";
import {ForwardedRef, forwardRef, JSX} from "react";

import cn from 'classnames';
import style from './TextArea.module.css';

const TextArea = ({ className, validationMessage, ...props }: TextAreaProps): JSX.Element  => {
    return (
        <div className={cn(style.textareaWrapper, className)}>
            <textarea className={style.formDescription} {...props}/>
            {validationMessage && <span className={style.validationMessage}>{validationMessage}</span>}
        </div>
    );
};

export default TextArea;