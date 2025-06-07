
import React, { useState, useEffect } from 'react';
import { useHttp } from '../../hooks/useHttp';
import {MenuItem,PageItem, FirstLevelMenuItem} from '../../interfaces/menu.interface';
import CourcesIcon from './icons/Courses.svg';
import ServicesIcon from './icons/Services.svg';
import BooksIcon from './icons/Books.svg';
import ProductsIcon from './icons/Products.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';
import cn from 'classnames';

import style from './menu.module.css';
import Page from '@/app/(main)/page';

const Menu =  (): React.JSX.Element => {

    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [activeMenuLevel, setActiveMenuLevel] = useState(TopLevelCategory.Courses);
    const [activeSUbMenuLevel, setActiveSibMenuLevel] = useState(false);
    const { fetchMenu } = useHttp();
    useEffect(() => {
        const getMenu = async () => {
            const data = await fetchMenu(0);
            setMenu(data);
        };
        getMenu();
    }, []);

    const firstLevelMenu: FirstLevelMenuItem[] = [
        { route: 'pages', name: 'Курсы', icon: <CourcesIcon />, id:TopLevelCategory.Courses },
        { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
        { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
        { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopLevelCategory.Products }
    ];

    const makeFirstLevelMenu = () => {
        return firstLevelMenu.map((firstLevelItem: FirstLevelMenuItem) => 
            <div key={firstLevelItem.id} className={style.firstLevel}

            onClick={(e) => {e.preventDefault(); setActiveMenuLevel(firstLevelItem.id);
            
            }}>
                <a href={`/${firstLevelItem.route}`}>
                    <div className={cn(style.firstLevelItem, {
                        [style.firstLevelItemActive]: firstLevelItem.id === activeMenuLevel})}>
                        {firstLevelItem.icon}
                        <span className={style.firstLevelItemText}>
                            {firstLevelItem.name}
                        </span>
                    </div>
                </a>
                {firstLevelItem.id === 0 && makeSecondLevelMenu(menu, firstLevelItem.route)}
            </div>
        );
    };

    const makeSecondLevelMenu = (menu: MenuItem[], route: string) => {
        return (
            <div className={style.secondLevel}>
                {menu.map((secondLevelItem) => {
                    console.log("###",secondLevelItem,"###");

                    return (
                        <div key = {secondLevelItem._id?.secondCategory} className={style.secondLevel}>
                            <div className={style.secondLevelItem}>
                                {secondLevelItem._id?.secondCategory.toUpperCase()}
                            </div>
                            <div className={ cn(style.thirdLevel, {
                                [style.thirdLevelActive]: activeSUbMenuLevel
                                })}>
                                {makeThirdLevelMenu(secondLevelItem.pages, route)} 
                            </div>

                        </div>
                    );
                })}
            </div>
);
    };

    const makeThirdLevelMenu = (secondLevelItem: PageItem[] | undefined, route: string) => {
        return secondLevelItem?.map(page => {
            return ( 
                <div key={page._id} className={style.thirdLevelItem}>
                   <a href={`/${route}/${page.alias}`}>
                        <div className={style.thirdLevelItemText}>
                            {page.category} 
                        </div>
                    </a>    
                </div>
            );
        });
    };

    return (    
        <>
            <nav className="menu">
                {makeFirstLevelMenu()}
            </nav>
        </>
    );


};

    export default Menu;