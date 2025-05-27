import {ReactNode} from "react";

export interface PProps {
    fontSize?: 'small' | 'regular' | 'large';
    children: ReactNode;
    className?: string;
}
