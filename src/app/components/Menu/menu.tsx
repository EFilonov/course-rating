
import React, { useState, useEffect } from 'react';
import { useHttp } from '../../hooks/useHttp';
import { MenuItem, PageItem, FirstLevelMenuItem } from '../../interfaces/menu.interface';
import CourcesIcon from './icons/Courses.svg';
import ServicesIcon from './icons/Services.svg';
import BooksIcon from './icons/Books.svg';
import ProductsIcon from './icons/Products.svg';
import { TopLevelCategory } from '../../interfaces/page.interface';
import cn from 'classnames';

import style from './menu.module.css';

const Menu =  (): React.JSX.Element => {

    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [activeMenuLevel, setActiveMenuLevel] = useState(0);
    const [activeSUbMenuLevel, setActiveSubMenuLevel] = useState<MenuItem | undefined>(undefined);
    const [activePageId, setActivePageId] = useState<string | undefined>(undefined);

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
        console.log('resetMenu', activeMenuLevel,  activeSUbMenuLevel, activePageId,);

    const resetMenu = (levelItemId: number):void => {
        if (levelItemId !== 0) {
            setActivePageId(undefined); 
            setActiveSubMenuLevel(undefined);}
        
        
        setActiveMenuLevel(levelItemId);
    };

    const makeFirstLevelMenu = () => {
        return (
            <ul  className={style.firstLevel}>
                {firstLevelMenu.map((firstLevelItem: FirstLevelMenuItem) => {
                    return  (<li key={firstLevelItem.id} onClick={(e) => {e.preventDefault(); resetMenu(firstLevelItem.id);}}>
                                <a href={`/${firstLevelItem.route}`}>
                                    <div className={cn(style.firstLevelItem, {
                                        [style.firstLevelItemActive]: firstLevelItem.id === activeMenuLevel})}>
                                        {firstLevelItem.icon}
                                        <span className={style.firstLevelItemText}>
                                            {firstLevelItem.name}
                                        </span>
                                    </div>
                                </a>
                                {!activeMenuLevel && firstLevelItem.id === activeMenuLevel && makeSecondLevelMenu(menu, firstLevelItem.route)}
                            </li>);
                })}
            </ul>
        );
    };

    const makeSecondLevelMenu = (menu: MenuItem[], route: string) => {
        return (
            <ul className={style.secondLevel}>
                {menu.map((secondLevelItem: MenuItem) => {
                    return (
                        <li key = {secondLevelItem._id?.secondCategory} className={style.secondLevelItem}>
                                <div className={cn({
                                [style.secondLevelItemActive]: secondLevelItem._id === activeSUbMenuLevel?._id})}
                                onClick={(e) => {e.preventDefault();setActiveSubMenuLevel(secondLevelItem);}}>        
                                    <span className={style.secondLevelItemText}>
                                        {secondLevelItem._id?.secondCategory}
                                    </span>
                                </div>     
                            {secondLevelItem._id === activeSUbMenuLevel?._id && makeThirdLevelMenu(activeSUbMenuLevel?.pages, route)} 
                        </li>
                    );
                })}
            </ul>
        );
    };

    const makeThirdLevelMenu = (activeSUbMenuLevel: PageItem[] | undefined, route: string) => {
        return (
            <ul className={style.thirdLevel}>
                {activeSUbMenuLevel?.map((page: PageItem) => {
                    return ( 
                        <li key={page._id} className={style.thirdLevelItem}>
                            <div className= {cn({[style.thirdLevelItemActive]: page._id === activePageId})} 
                            onClick={(e) => {e.preventDefault();setActivePageId(page._id);}}>
                                <a href={`/${route}/${page.alias}`}>
                                    <span className={style.thirdLevelItemText}>{page.category}</span>
                                </a>
                            </div>
                        </li>
                    );
                })}
            </ul>
        );
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