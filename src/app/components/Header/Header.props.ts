import { DetailedHTMLProps, HTMLAttributes, ClassAttributes } from 'react';

export interface HeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    clasName?: string;
    onClick?: React.MouseEventHandler<HTMLDivElement>;
}