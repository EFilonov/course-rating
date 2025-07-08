import { API } from './../api/api';
import  { httpService } from '../services/httpService';
import { MenuItem } from '../interfaces/menu.interface';
import { TopPageModel } from '../interfaces/page.interface';
import { ProductModel } from '../interfaces/product.interface';

const { request } = httpService();

export const useHttp = () => {
    const fetchMenu =  (firstCategory : number):Promise<MenuItem[]> => request (API.topPage.find, 'POST', JSON.stringify({ firstCategory }));

    const fetchPage = (alias: string): Promise<TopPageModel> => request(API.topPage.byAlias + alias);

    const fetchProducts = (category: string): Promise<ProductModel[]> => request(API.product.find, 'POST',JSON.stringify({
    category: category,
    limit: 10,
    }));

    return  { fetchMenu, fetchPage, fetchProducts};
};


    
    
    

