
import {HTMLAttributes, ClassAttributes, DetailedHTMLProps} from "react";

export interface DynamicPageTitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    className?: string;
    title: string;
    count: number;
}
