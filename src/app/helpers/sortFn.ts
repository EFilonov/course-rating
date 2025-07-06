import { ProductModel } from "../interfaces/product.interface";

export const sortProducts = ( products: ProductModel[], sortType: string) => {
        switch (sortType) {
            case 'rating': return [...products].sort((a, b) => b.initialRating - a.initialRating);
            case 'price': return [...products].sort((a, b) => a.price - b.price);
            case 'reviews': return [...products].sort((a, b) => b.reviews.length - a.reviews.length);
            default: return products;
        }
    };