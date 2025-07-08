import { ProductModel } from "@/app/interfaces/product.interface";
import {HTMLAttributes, ClassAttributes, DetailedHTMLProps} from "react";

export interface ProductsListProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>, ClassAttributes<HTMLUListElement> {
    className?: string;
    products: ProductModel[];
}
