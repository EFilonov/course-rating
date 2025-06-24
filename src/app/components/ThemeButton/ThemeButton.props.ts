
import {ButtonHTMLAttributes, DetailedHTMLProps, ClassAttributes} from "react";

export interface ThemeButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ClassAttributes<HTMLButtonElement>{
    className?: string;
}