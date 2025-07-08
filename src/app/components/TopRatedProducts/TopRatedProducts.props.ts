
import { ProductModel } from "@/app/interfaces/product.interface";
import {HTMLAttributes, ClassAttributes, DetailedHTMLProps} from "react";

export interface TopRatedProductsProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>, ClassAttributes<HTMLFormElement> {
    filter?: string;
    className?: string;
    products: ProductModel[];
}
