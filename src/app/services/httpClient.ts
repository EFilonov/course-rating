import { API } from '../api/api';
import  { httpService } from './httpService';
import { MenuItem } from '../interfaces/menu.interface';
import { TopPageModel } from '../interfaces/page.interface';
import { ProductModel } from '../interfaces/product.interface';


const { request } = httpService();

export const httpClient = () => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_LOCAL;
    
    const fetchMenu = async (firstCategory : number) :Promise<MenuItem[]> =>{ 
        try {
            await delay(10); 
            const res = await fetch(`${baseUrl}/api/menu?category=${firstCategory}`);
            if (res.ok) {
               console.log('Меню получено c внутреннего API');
               const data = await res.json();
               return  data as MenuItem[];}
        } catch (error) {
            console.error('Error fetching menu from internal API:', error);
        };
        try {
            console.log('Меню получено c внешнего API');
            return await request(`${baseUrl}/api/menu`, 'POST', JSON.stringify({ firstCategory: firstCategory }));
        } catch (error) {
            console.error('Error fetching menu from external API:', error);
        }
        return await request (API.topPage.find, 'POST', JSON.stringify({ firstCategory }));
    };



    const fetchPage = async (alias: string): Promise<TopPageModel> => {
        try {
            await delay(10);
            const res = await fetch(`${baseUrl}/api/page?alias=${alias}`);
            if (res.ok) {
                return await res.json();
            }
        } catch (error) {
            console.error('Error fetching page from internal API:', error);
        }
        try {
            return request(`${baseUrl}/api/page`, 'POST', JSON.stringify({ alias: alias })) ;
         } catch (error) {
            console.error('Error fetching page from external API:', error);
        }
        return await request(API.topPage.byAlias + alias);
    };
    

    const fetchProducts = (category: string): Promise<ProductModel[]> => request(API.product.find, 'POST',JSON.stringify({
    category: category,
    limit: 10,
    }));

    return  { fetchMenu, fetchPage, fetchProducts};
};






