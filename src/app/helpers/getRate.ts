import { ProductModel } from "../interfaces/product.interface";


export const getRate = (product: ProductModel) => {
        const roundToOneDecimal = (val: number): number => {
            return Math.round(val * 10) / 10;
        };

        if (product.reviewAvg !== null && product.reviewAvg !== undefined) {
            return roundToOneDecimal(product.reviewAvg);
        } else if (product.initialRating) {
            return roundToOneDecimal(product.initialRating);
        }
        return 0;
    };    