import {ButtonHTMLAttributes, DetailedHTMLProps, ClassAttributes} from "react";

export interface HamburgerProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ClassAttributes<HTMLButtonElement> {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    className?: string;
    active?: boolean;
    
    
}