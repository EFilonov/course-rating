import { DetailedHTMLProps, HTMLAttributes, ClassAttributes } from "react";

export interface StarProps  extends DetailedHTMLProps<HTMLAttributes<HTMLOrSVGImageElement>, HTMLOrSVGImageElement>, ClassAttributes<HTMLOrSVGImageElement> {
    value: number;
    className?: string;
}