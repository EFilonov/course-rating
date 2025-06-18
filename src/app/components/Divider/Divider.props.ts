import {ClassAttributes, DetailedHTMLProps, HTMLAttributes} from "react";

export interface DividerProps extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>, ClassAttributes<HTMLHRElement> {
    className?: string;
}
