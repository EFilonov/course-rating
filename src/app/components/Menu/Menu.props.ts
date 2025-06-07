import { MenuItem } from "@/app/interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "@/app/interfaces/page.interface";

export interface MenuProps {
    menu: MenuItem;
    firstCategory: TopLevelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
    className?: string;
    isOpened?: boolean;
    setIsOpened?: (isOpened: boolean) => void;
    page: TopPageModel
}