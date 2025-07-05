import { ProductModel } from "@/app/interfaces/product.interface";
import { DetailedHTMLProps, ClassAttributes, HTMLAttributes} from "react";

export interface ProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, ClassAttributes<HTMLDivElement> {
    onClick?: () => void;
    product: ProductModel;
    className?: string;
}