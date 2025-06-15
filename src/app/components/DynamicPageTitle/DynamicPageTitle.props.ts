
import {HTMLAttributes, ClassAttributes, DetailedHTMLProps} from "react";
import {TopPageModel} from "@/app/interfaces/page.interface";

export interface DynamicPageTitleProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    className?: string;
    title: string;
    count: number;
   
}
