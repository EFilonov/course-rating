import { useHttp } from "@/app/hooks/useHttp";
import { notFound } from "next/navigation";
import { MenuItem, PageItem } from "@/app/interfaces/menu.interface";
import { firstLevelMenu } from "@/app/components/Menu/constants/firstLevelMenu";
import path from "path";




interface Path {
        category: string;
        alias: string;
    }
const { fetchPage, fetchMenu, fetchProducts } = useHttp();

// export const generateStaticParams = async () => {
//     const menu = await fetchMenu(0);

//     return menu.map(item =>{
        
//         if (item.pages) {
            
//             return item.pages.map(page => ({category: 'cources', alias: page.alias }));
//         }
//         return notFound();
//     });

// export const generateStaticParams = async () => {
//     // let paths: Path[]= [];
//     for ( const firstCategory of firstLevelMenu ) {
//         const menuCategory = await fetchMenu(firstCategory.id);
//         // menuArr = [...menuArr, ...menuCategory];
    
//     return menuCategory.map((item: MenuItem)=> { 
//             return item.pages.map((page: PageItem) => {
//                 // console.log('generateStaticParams', page.alias);
//                 return [{ 
//                     category: firstCategory.route, 
//                     alias: page.alias }];
//                 });
//         }); 
//     }
//     return [];
// };

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

    if (!page || !page.category) {
        notFound();
    }

    const pages = await fetchProducts(page.category);

    // if (!pages ) {
    //     notFound();
    // }

    // const metaData: Metadata = {
    //     title: "ProductPage",
    // };

    return (
        <>
            <div>
                {(JSON.stringify(pages).length > 1) ? JSON.stringify(pages): <h1> Under construction</h1>}
            </div>
        </>
    );

};

export default CourcesPage;