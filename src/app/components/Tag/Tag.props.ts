
import {HTMLAttributes, ReactNode, ClassAttributes, DetailedHTMLProps} from "react";

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    size?: 'small' | 'regular';
    children: ReactNode;
    className?: string;
    color?: 'ghost' | 'grey' | 'red' | 'green' | 'primary' | 'primary-blue';
    href?: string;
}
