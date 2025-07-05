import { MenuItem } from "./menu.interface";
import { TopPageModel } from "./page.interface";
import { ProductModel } from "./product.interface";

export interface MenuState {
    // menus: MenuItem[][];
    setMenus?: (menus: MenuItem[][]) => void;
    loading: boolean;
    error?: string | null;
    flatMenu: FlatMenuState[];
    allProducts: ProductModel[];
}

export interface FlatMenuState {
    firstLvl: string;
    firstLvlName: string;
    secondLvlName: string;
    thirdLvl: string;
    thirdLvlName: string;
    href: string;
    thirdLvlId: string;
    productsCategory: string;
    [key: string]: string
}

