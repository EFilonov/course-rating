import { create } from "zustand";
import { MenuItem } from "../interfaces/menu.interface";
import {firstLevelMenu} from "../components/Menu/constants/firstLevelMenu";
import { useHttp } from "../hooks/useHttp";

interface MenuState {
    menus: MenuItem[][];
    setMenus?: (menus: MenuItem[][]) => void;
    loading: boolean;
    error?: string | null;

}
const { fetchMenu } = useHttp();

export const menuState = create<MenuState>((set) => ({
    menus: [],
    loading: false,
    error: null,
    
    fetchMenus: {
        loading: true,
        setMenus: Promise.all(
            firstLevelMenu.map((firstCategory) => fetchMenu(firstCategory.id)))
        .then((allMenus) => { 
           return set({ menus: allMenus, loading: false });
        })
        .catch((error) => {
            console.error('Error fetching menus:', error);
            set({ error: error instanceof Error ? error.message : 'Ошибка загрузки меню', loading: false });
        })
        .finally(() => {
            set({ loading: false });
        })
    }
}));