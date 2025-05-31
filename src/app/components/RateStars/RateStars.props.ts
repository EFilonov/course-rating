
import { ClassAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

export interface rateProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    isEditable?: boolean;
    rate?: number;
    setRating?: (rating: number) => void;
    className?: string;

}
