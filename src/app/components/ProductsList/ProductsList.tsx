"use client";
import {ProductsListProps} from "./ProductsList.props";
import {JSX} from "react";
import cn from 'classnames';
import { useSort } from "@/app/store/sort";
import { ProductModel } from "@/app/interfaces/product.interface";

import style from './ProductsList.module.css';
import Product from "../Product/Product";

const ProductsList = ({ className, products}: ProductsListProps): JSX.Element  => {
    const {sortType } = useSort();
        
    const sortProducts = ( products: ProductModel[]) => {
        if (sortType === 'rating') {
            return [...products].sort((a, b) => b.initialRating - a.initialRating);
        }
        if (sortType === 'price') {
            return [...products].sort((a, b) => b.price - a.price);
        }
    };

   return (
        <ul className = {cn(style.products, className)}>
                {sortProducts(products)?.map((product) => (
                    <li key={product._id} className={style.productItem}>
                        <Product product = {product} />
                    </li>
                ))}
            </ul>
    );
};

export default ProductsList;