import {ButtonHTMLAttributes, DetailedHTMLProps, ClassAttributes} from "react";



export interface HamburgerProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ClassAttributes<HTMLButtonElement> {
    
    className?: string;
    active?: boolean;
    
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}