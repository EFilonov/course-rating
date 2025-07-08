
import { DetailedHTMLProps, ClassAttributes, HTMLAttributes} from "react";

export interface SearchResultsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    className?: string;
    
}