import {ClassAttributes, DetailedHTMLProps, HTMLAttributes} from "react";

export interface TextAreaProps extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, ClassAttributes<HTMLTextAreaElement> {
    placeholder?: string;
    className?: string;
    name?: string;
    value?: string | number;
    validationMessage?: string;
}
