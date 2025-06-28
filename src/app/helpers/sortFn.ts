import { ProductModel } from "../interfaces/product.interface";

export const sortProducts = ( products: ProductModel[], sortType: string) => {
        if (sortType === 'rating') {
            return [...products].sort((a, b) => b.initialRating - a.initialRating);
        }
        if (sortType === 'price') {
            return [...products].sort((a, b) => b.price - a.price);
        }
        if (sortType === 'reviews') {
            return [...products].sort((a, b) => b.reviews.length - a.reviews.length);
        }
    };