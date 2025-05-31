import {ClassAttributes, DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";

export interface PProps extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>, ClassAttributes<HTMLParagraphElement> {
    fontSize?: 'small' | 'regular' | 'large';
    children: ReactNode;
    className?: string;
}
