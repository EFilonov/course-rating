import { create } from "zustand";
import { MenuItem } from "../interfaces/menu.interface";
import {firstLevelMenu} from "../components/Menu/constants/firstLevelMenu";
import { useHttp } from "../hooks/useHttp";
import { FlatMenuState, MenuState } from "../interfaces/menuState.interface";


const { fetchMenu } = useHttp();

const  generateFlatMenu = (menus: MenuItem[][]): FlatMenuState[] => {
    const flat: FlatMenuState[] = [];
    menus.forEach((menuArr, firstIdx) => {
        const first = firstLevelMenu[firstIdx];
        menuArr.forEach((second) => {
            second.pages.forEach((third) => {
                flat.push({
                    firstLvl: first.route,
                    firstLvlName: first.name,
                    secondLvlName: second._id.secondCategory,
                    thirdLvl: third.alias,
                    thirdLvlName: third.title,
                    href: `/${first.route}/${third.alias}`,
                    thirdLvlId: third._id
                });
            });
        });
    });
    return flat;
};

export const menuState = create<MenuState>((set) => ({
    menus: [],
    loading: false,
    error: null,
    flatMenu:[],
    
    fetchMenus: {
        loading: true,
        setMenus: Promise.all(
            firstLevelMenu.map((firstCategory) => fetchMenu(firstCategory.id)))
        .then((allMenus) => { 
            return set({ 
                menus: allMenus, 
                loading: false, 
                flatMenu: generateFlatMenu(allMenus)
            });
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

