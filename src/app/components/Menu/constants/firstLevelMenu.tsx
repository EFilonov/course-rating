import React from "react";
import Image from "next/image";

export interface FirstLevelMenuItem {
    route: string;
    name: string;
    icon: React.JSX.Element;
    id: number;
}


export const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'cources', name: 'Курсы', icon: <Image width={24} height={24} src="/icons/menu/Cources-icon.svg" alt="cources"/>, id: 0 },
    { route: 'services', name: 'Сервисы', icon: <Image width={24} height={24} src="/icons/menu/Services-icon.svg" alt="services" />, id: 1 },
    { route: 'forkids', name: 'Для детей', icon: <Image width={24} height={24} src="/icons/menu/ForKids-icon.svg" alt="forkids" />, id: 4 },
];