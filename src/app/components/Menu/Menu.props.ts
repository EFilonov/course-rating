import { MenuItem } from "@/app/interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "@/app/interfaces/page.interface";
import { ClassAttributes, DetailedHTMLProps, HTMLAttributes } from "react";

export interface MenuProps extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>, ClassAttributes<HTMLUListElement> {
    menu?: MenuItem;
    firstCategory?: TopLevelCategory;
    setMenu?: (newMenu: MenuItem[]) => void;
    className?: string;
    isOpened?: boolean;
    setIsOpened?: (isOpened: boolean) => void;
    page?: TopPageModel
   
}