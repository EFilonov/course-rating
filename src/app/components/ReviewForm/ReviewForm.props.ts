
import {HTMLAttributes, ClassAttributes, DetailedHTMLProps} from "react";

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>, ClassAttributes<HTMLFormElement> {
    productId: string;
}
