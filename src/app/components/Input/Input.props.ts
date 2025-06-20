import {ClassAttributes, DetailedHTMLProps, HTMLAttributes} from "react";

export interface InputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>, ClassAttributes<HTMLInputElement> {
    placeholder?: string;
    className?: string;
    name?: string;
    value?: string | number;
    type?: string;
    validationMessage?: string;
}
