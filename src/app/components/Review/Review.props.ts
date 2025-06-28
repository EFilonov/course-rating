
import { Review } from "@/app/interfaces/product.interface";
import {HTMLAttributes, ClassAttributes, DetailedHTMLProps} from "react";

export interface ReviewProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    reviews: Review[];
    className?: string;
    productId: string;
}
