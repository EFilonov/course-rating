"use client";
import React, { useState, useEffect, use } from 'react';
import { useHttp } from '../../hooks/useHttp';
import { MenuItem, PageItem, FirstLevelMenuItem } from '../../interfaces/menu.interface';
import cn from 'classnames';
import style from './menu.module.css';
import Link from 'next/link';
import { firstLevelMenu } from './constants/firstLevelMenu';

const Menu = (): React.JSX.Element => {

    const [menu, setMenu] = useState<MenuItem[]>([]);
    const [activeMenuLevel, setActiveMenuLevel] = useState<number | undefined>(0);
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

    const toggleFirstLevelMenu = (firstLevelItem: FirstLevelMenuItem): void => {
        
        if (activeMenuLevel === firstLevelItem.id) {    
            setActiveMenuLevel(undefined);
            setActiveSubMenuLevel(undefined);
            setActivePageId(undefined);
        } else {
            setActiveMenuLevel(firstLevelItem.id);
            setActiveSubMenuLevel(undefined);  
            setActivePageId(undefined); 
        }
    };

    const toggleSubMenu = (secondLevelItem: MenuItem): void => {
        (activeSUbMenuLevel?._id === secondLevelItem._id) ? setActiveSubMenuLevel(undefined) : setActiveSubMenuLevel(secondLevelItem); 
    };

    const makeFirstLevelMenu = () => {
        
        return (
            <ul className={style.firstLevel}>
                {firstLevelMenu.map((firstLevelItem) => {
                    return (<li key={firstLevelItem.id} >
                        <Link href={`/${firstLevelItem.route}`}onClick={() => {toggleFirstLevelMenu(firstLevelItem); }}>
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
                            <Link href={`/${route}/${page.alias}`} onClick={() => { setActivePageId(page._id); }}
                            >
                                <div className={cn({ [style.thirdLevelItemActive]: page._id === activePageId 

                                })}>
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