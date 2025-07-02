import { MenuItem } from "./menu.interface";

export interface MenuState {
    menus: MenuItem[][];
    setMenus?: (menus: MenuItem[][]) => void;
    loading: boolean;
    error?: string | null;
    flatMenu: FlatMenuState[];
}

export interface FlatMenuState {
    firstLvl: string;
    firstLvlName: string;
    secondLvlName: string;
    thirdLvl: string;
    thirdLvlName: string;
    href: string;
    thirdLvlId: string;
    [key: string]: string
}