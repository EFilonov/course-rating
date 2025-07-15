import { notFound } from "next/navigation";
import { MenuItem, PageItem } from "@/app/interfaces/menu.interface";
import { firstLevelMenu } from "@/app/components/Menu/constants/firstLevelMenu";
import Htag from "@/app/components/Htag/Htag";
import Tag from "@/app/components/Tag/Tag";
import HhData from "@/app/components/HhData/HhData";
import Advantages from "@/app/components/Advantages/Advantages";
import parse from 'html-react-parser';
import DynamicPageTitle from "@/app/components/DynamicPageTitle/DynamicPageTitle";
import ProductsList from "@/app/components/ProductsList/ProductsList";
import { Metadata } from "next";
import { httpClient } from "@/app/services/httpClient";
import { connectMongo } from "@/app/services/mongoService";
import { Menu } from "@/app/dbSchemas/menuSchema";
import { Page } from "@/app/dbSchemas/pageSchema";
import { TopPageModel } from "@/app/interfaces/page.interface";
import { Products } from "@/app/dbSchemas/productsSchema";
import { ProductModel } from "@/app/interfaces/product.interface";

import style from './DinamicPage.module.css';


const { fetchPage, fetchMenu, fetchProducts } = httpClient();

export const generateMetadata = async ({ params }: { params: Promise<{ category: string, alias: string }> }): Promise<Metadata> => {

    const { alias, category } = await params;
    const page = await fetchPage(alias);
    if (!page) { notFound(); }

    return {
        title: page.metaTitle,
        description: page.metaDescription,
        openGraph: {
            title: page.metaTitle,
            description: page.metaDescription,
            images: '/images/openGraph.png',
            url: `https://yourdomain.com/${category}/${alias}`, // настройка URL для Open Graph
            type: 'article',
            siteName: 'Evgeniy Filonov portfolio',
            locale: 'ru_RU',
        },
        metadataBase: new URL('https://yourdomain.com'), // настройка базового URL для метаданных
        twitter: {
            card: 'summary_large_image',
            title: page.metaTitle,
            description: page.metaDescription,
            images: '/images/openGraph.png',
            creator: '@KipZhek',
        },
    };
};

interface Path {
    category: string;
    alias: string;
}
const getMenuFromDborFetch = async (category: number): Promise<MenuItem[]> => {
    await connectMongo();
    const menuCategory = await Menu.find(
        { firstCategory: category },
        { menu: 1, _id: 0 });
    if (!menuCategory || menuCategory.length === 0) {
       return await fetchMenu(category);
    }
    return menuCategory[0].menu;
};

const getPageFromDborFetch = async (alias: string): Promise<TopPageModel> => {
    await connectMongo();
    const page = await Page.findOne(
    { alias: alias },
    { page: 1, _id: 0 });
    if (!page || !page.pages || page.pages.length === 0) {
        return await fetchPage(alias);;
    }
    return await page[0].page;
};

const getProductsFromDborFetch = async (category: string): Promise<ProductModel[]> => {
    await connectMongo();
    const products = await Products.find(
        { category: category },
        { products: 1, _id: 0 });
    if (!products || products.length === 0) {
        return await fetchProducts(category);
    }
    return products[0].products;
};


export const generateStaticParams = async () => {
    
    const paths: Path[] = [];
    for (const firstCategory of firstLevelMenu) {
        const menuItems = await getMenuFromDborFetch(firstCategory.id);
        menuItems.forEach((item: MenuItem) => {
            item.pages.forEach((page: PageItem) => {
                paths.push({ category: firstCategory.route, alias: page.alias });
            });
        });
    }
    return paths;
};

const CourcesPage = async ({ params }: { params: Promise<{ category: string, alias: string }> }) => {
    const { alias, category } = await params;
    const page = await getPageFromDborFetch(alias);
    if (!page || !category) { notFound(); }

    const products = await getProductsFromDborFetch(page.category);

    if (!products) { notFound(); }

    return (
        <div className={style.pageWrapper}>

            <DynamicPageTitle count={products.length} title={page.title} />
            <ProductsList className={style.products} products={products} />

            <div className={style.hhtitle}>
                <Htag tag='h2'> Вакансии - {page.category}</Htag>
                <Tag size='regular' color='red'>work.ua</Tag>
            </div>
            {page.hh && <HhData {...page.hh} className={style.hh} />}

            {(page.advantages && page.advantages.length > 0) ?
                <Advantages advantages={page.advantages} /> : <></>}

            {page.seoText && <div className={style.seoText}>
                <div className={style.seoTextContent}>
                    {parse(page.seoText)}</div>
            </div>}

            <div className={style.tags}>
                <Htag tag='h3'> Получаемые навыки</Htag>
                <div className={style.tagsContent}>
                    {page.tags.map((tag, index) => (
                        <Tag key={index} size='small' color='green' className={style.bottomTags}>{tag}</Tag>
                    ))}
                </div>
            </div>
        </div>
    );

};

export default CourcesPage;