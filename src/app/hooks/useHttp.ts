import { API } from './../api/api';
import  { httpService } from '../services/httpService';
import { MenuItem } from '../interfaces/menu.interface';

    
const { request } = httpService();

export const useHttp = (firstCategory: number = 0) => {
    const fetchMenu =  () =>  request (API.topPage.find, 'POST', JSON.stringify({ firstCategory }));

    return  { fetchMenu };
};


    
    
    

