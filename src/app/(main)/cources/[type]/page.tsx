import { use } from "react";


import { Metadata } from "next";
import { useHttp } from "@/app/hooks/useHttp";
import { notFound } from "next/navigation";
import { } from "@/app/interfaces/page.interface";
const { fetchPage, fetchMenu, fetchProducts } = useHttp();

export const generateStaticParams = async () => {
    const menu = await fetchMenu(0);

    return menu.flatMap(item => item.pages ? item.pages.map(page => ({ type: page.alias })) : []);
};

const ProductPage = ({ params }: { params: Promise<{ type: string }> }) => {
    const { type } = use(params); // по скольку params - это Promise (обновление некста), то нужно использовать use для получения значения
    const page = use(fetchPage(type));

    if (!page) {
        notFound();
    }

    const pages = use(fetchProducts(page.category));

    const metaData: Metadata = {
        title: "ProductPage",
    };

    return (
        <>
            <div>
                {JSON.stringify(pages)}
            </div>
        </>
    );

};

export default ProductPage;

