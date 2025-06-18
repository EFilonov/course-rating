import {ReactNode, ButtonHTMLAttributes, DetailedHTMLProps, ClassAttributes} from "react";



export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ClassAttributes<HTMLButtonElement> {
    appearance: 'blue' | 'gray';
    children: ReactNode;
    arrow?: 'right' | 'down' | 'none';
    clasName?: string;
    // className?: string;
    // onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}