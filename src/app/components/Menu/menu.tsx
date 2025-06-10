"use client";
import React, { useState, useEffect, use } from 'react';
import { useHttp } from '../../hooks/useHttp';
import { MenuItem, PageItem, FirstLevelMenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory } from '../../interfaces/page.interface';
import cn from 'classnames';

import CourcesIcon from './icons/Cources-icon.svg';
import ServicesIcon from './icons/Services-icon.svg';
import BooksIcon from './icons/Books-icon.svg';
import ProductsIcon from './icons/Products-icon.svg';

import style from './menu.module.css';
import Link from 'next/link';
import {  useRouter } from 'next/navigation';

const Menu = (): React.JSX.Element => {

    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [activeMenuLevel, setActiveMenuLevel] = useState<number | undefined>(undefined);
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
        { route: 'cources', name: 'Курсы', icon: <CourcesIcon />, id: TopLevelCategory.Courses },
        { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Services },
        { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Books },
        { route: 'products', name: 'Товары', icon: <ProductsIcon />, id: TopLevelCategory.Products }
    ];

    const toggleFirstLevelMenu = (firstLevelItem: FirstLevelMenuItem): void => {
        if (activeMenuLevel === firstLevelItem.id) {    
            setActiveMenuLevel(undefined);
            setActiveSubMenuLevel(undefined);
            setActivePageId(undefined);
        } else {
            setActiveMenuLevel(firstLevelItem.id);
        }};

    const toggleSubMenu = (secondLevelItem: MenuItem): void => {
        (activeSUbMenuLevel?._id === secondLevelItem._id) ? setActiveSubMenuLevel(undefined) : setActiveSubMenuLevel(secondLevelItem); 
    };

    const makeFirstLevelMenu = () => {
        
        return (
            <ul className={style.firstLevel}>
                {firstLevelMenu.map((firstLevelItem) => {
                    return (<li key={firstLevelItem.id} >
                        <Link href={`/${firstLevelItem.route}`}onClick={() => { toggleFirstLevelMenu(firstLevelItem); }}>
                            <div className={cn(style.firstLevelItem, { [style.firstLevelItemActive]: firstLevelItem.id === activeMenuLevel })}>
                                {firstLevelItem.icon} 
                                <span className={style.firstLevelItemText}>
                                    {firstLevelItem.name}
                                </span>
                            </div>
                        </Link>
                        {!activeMenuLevel && firstLevelItem.id === activeMenuLevel && makeSecondLevelMenu(menu, firstLevelItem.route)}
                    </li>);
                })}
            </ul>
        );
    };

    const makeSecondLevelMenu = (menu: MenuItem[], route: string) => {

        if (!menu.length) return null;

        return (
            <ul className={style.secondLevel}>
                {menu.map((secondLevelItem) => {
                    return (
                        <li key={secondLevelItem._id?.secondCategory} className={style.secondLevelItem}>
                            <div className={cn({
                                [style.secondLevelItemActive]: secondLevelItem._id === activeSUbMenuLevel?._id
                            })}
                                onClick={() => { toggleSubMenu(secondLevelItem); }}>
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
                            <Link href={`/${route}/${page.alias}`} onClick={() => { setActivePageId(page._id); }}>
                                <div className={cn({ [style.thirdLevelItemActive]: page._id === activePageId })}>
                                    <span className={style.thirdLevelItemText}>{page.category}</span>
                                </div>
                            </Link>
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