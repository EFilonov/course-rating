import {TextAreaProps} from "./TextArea.props";
import {ForwardedRef, forwardRef, JSX} from "react";

import cn from 'classnames';
import style from './TextArea.module.css';

const TextArea = forwardRef(({ className, validationMessage, ...props }: TextAreaProps,  ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element  => {
    return (
        <div className={cn(style.textareaWrapper, className)}>
            <textarea className={style.formDescription} {...props} ref={ref}/>
            <span className={style.validationMessage}>{validationMessage}</span>
        </div>
    );
});

export default TextArea;