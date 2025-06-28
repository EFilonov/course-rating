"use client";
import { ProductsListProps } from "./ProductsList.props";
import { JSX } from "react";
import cn from 'classnames';
import { sortState} from "@/app/store/sortState";
import Product from "../Product/Product";
import { sortProducts } from "@/app/helpers/sortFn";

import style from './ProductsList.module.css';

const ProductsList = ({ className, products }: ProductsListProps): JSX.Element => {
    const { sortType } = sortState();


    return (
        <ul className={cn(style.products, className)}>
            {sortProducts(products, sortType)?.map((product) => {
                return <li key={product._id} className={style.productItem}>
                    <Product layout product={product} />
                </li>;
            })}
        </ul>
    );
};

export default ProductsList;