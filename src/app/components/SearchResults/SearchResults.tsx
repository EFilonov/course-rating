"use client";
import { menuState } from "@/app/store/menuState";
import { useSearchParams } from "next/navigation";
import TopRatedProducts from "../TopRatedProducts/TopRatedProducts";


import Card from "../Card/Card";
import { use } from "react";
        
const SearchResults = (): React.JSX.Element => {
    const allProducts = menuState((state) => state.allProducts);
    const searchParams = useSearchParams();
    const searchMask = searchParams.get('q');

    const finded = allProducts.filter((product) => product.title.toLowerCase().includes(searchMask?.toLowerCase() || ''));
                 
    return (
        <Card>
            {finded.length> 0 ? <h3>По убыванию рейтинга:</h3> : <h3>К сожалению ничего не найдено...</h3>}
            <TopRatedProducts products={finded}/>
        </Card>
    );
};

export default SearchResults;