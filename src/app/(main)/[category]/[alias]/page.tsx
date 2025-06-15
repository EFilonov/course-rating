import { useHttp } from "@/app/hooks/useHttp";
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

import style from './DinamicPage.module.css';
const { fetchPage, fetchMenu, fetchProducts } = useHttp();

// export const generateStaticParams = async () => {
//     const menu = await fetchMenu(0);

//     return menu.map(item =>{
        
//         if (item.pages) {
            
//             return item.pages.map(page => ({category: 'cources', alias: page.alias }));
//         }
//         return notFound();
//     });

interface Path {
        category: string;
        alias: string;
    }

export const generateStaticParams = async () => {
    const paths: Path [] = [];
    for ( const firstCategory of firstLevelMenu ) {
        const menuCategory = await fetchMenu(firstCategory.id);
            menuCategory.forEach((item: MenuItem) => { 
                item.pages.forEach((page: PageItem) => {
                    
                paths.push({ category: firstCategory.route, alias: page.alias });    
                }); 
            });
    };
    return paths;
};

const CourcesPage = async ({ params }: { params: Promise<{category: string, alias: string }> }) => {
    const { alias, category } = await params; 

   const page = await fetchPage(alias);
    if (!page ) { notFound();}

    const products = await fetchProducts(page.category);

     if (!products ) { notFound();}

    // const metaData: Metadata = {
    //     title: "ProductPage",
    // };

    return (
        <div className={style.pageWrapper}>
            <DynamicPageTitle count={products.length} title={page.title}/>
            <ProductsList className={style.products} products = {products} />

            <div className={style.hhtitle}>
                <Htag tag='h2'> Вакансии - {page.category}</Htag>
                <Tag size='regular' color='red'>work.ua</Tag>
            </div>
            { page.hh && <HhData {...page.hh} className={style.hh} />}
            
            {(page.advantages && page.advantages.length > 0) ? 
            <Advantages advantages = {page.advantages}/> : <></>}
            
            {page.seoText && <div className={style.seoText}>
                <div className={style.seoTextContent}>
                    {parse(page.seoText)}</div>  
              </div> } 
                
            <div className={style.tags}>
                <Htag tag='h3'> Получаемые навыки</Htag>
                <div className={style.tagsContent}>
                    {page.tags.map((tag, index) => (
                        <Tag key={index} size='small' color='green'>{tag}</Tag>
                    ))}
                </div>
            </div>
        </div>     
        
    );

};

export default CourcesPage;