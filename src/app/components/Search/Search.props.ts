import { DetailedHTMLProps, ClassAttributes, HTMLAttributes} from "react";

export interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    className?: string;
    onMobileMenuClose: () => void;
}