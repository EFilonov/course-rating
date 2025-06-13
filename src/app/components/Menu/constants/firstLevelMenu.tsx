import React from "react";

export interface FirstLevelMenuItem {
    route: string;
    name: string;
    icon: React.JSX.Element;
    id: number;
}


export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'cources', name: 'Курсы', icon: <img src="/icons/menu/Cources-icon.svg" alt="Курсы"/>, id: 0 },
    { route: 'services', name: 'Сервисы', icon: <img src="/icons/menu/Services-icon.svg" alt="Сервисы" />, id: 1 },
    { route: 'forkids', name: 'Для детей', icon: <img src="/icons/menu/ForKids-icon.svg" alt="Книги" />, id: 4 },
    // { route: 'products', name: 'Товары', icon: <img src="/icons/menu/Products-icon.svg" alt="Товары" />, id: 2 }
];