"use client";
import React, { useState, useEffect, use } from 'react';
import { MenuItem, PageItem, FirstLevelMenuItem } from '../../interfaces/menu.interface';
import cn from 'classnames';
import Link from 'next/link';
import { firstLevelMenu } from './constants/firstLevelMenu';
import { motion } from "motion/react";
import { MenuProps } from './Menu.props';
import { usePathname } from 'next/navigation';
import { menuState } from '@/app/store/menuState';

import style from './Menu.module.css';

const Menu = ({className}: MenuProps): React.JSX.Element => {
    const path = usePathname();

    const menus = menuState((state) => state.menus);
    



    const [activeMenuLevel, setActiveMenuLevel] = useState<number | undefined>(0);
    const [activeSUbMenuLevel, setActiveSubMenuLevel] = useState<MenuItem | undefined>(undefined);
    const [activePageId, setActivePageId] = useState<string | undefined>(undefined);

    const animationVariantsForSubMenu = (idx: number) => ({
        hidden: { opacity: 0, x: -32 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 + idx * 0.04 } }
    });
        
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
    // Тот случай, когда соблюдая DRY, кода в 2 больше, потому нет DRY  
    const onKeyDownFirstLevelMenu = (e: React.KeyboardEvent<HTMLAnchorElement>, menuItem:  FirstLevelMenuItem ): void => {
        e.preventDefault();
        if (e.key === 'Enter' || e.key === ' ') {
         toggleFirstLevelMenu(menuItem);   
        }
    };

    const onKeyDownSecondLevelMenu = (e: React.KeyboardEvent<HTMLDivElement>, menuItem:  MenuItem ): void => {
        e.preventDefault();
        if (e.key === 'Enter' || e.key === ' ') {
         toggleSubMenu(menuItem);   
        }
    };
    console.log(menus, 'menus');
    const makeFirstLevelMenu = () => {
        return (
            <ul className={cn(style.firstLevel, className)}>
                {firstLevelMenu.map((firstLevelItem, index) => {
                    return (
                        <li key={firstLevelItem.id} >
                            <Link href={`#/${firstLevelItem.route}`}
                                onClick={() => {toggleFirstLevelMenu(firstLevelItem);}}
                                onKeyDown={(e) => onKeyDownFirstLevelMenu(e, firstLevelItem)}>
                                <motion.div className={cn(style.firstLevelItem, { [style.firstLevelItemActive]: firstLevelItem.id === activeMenuLevel })}
                                    initial={{ opacity: 0, x: -60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: 0.1 }}
                                    layout>
                                    {firstLevelItem.icon} 
                                    <span className={style.firstLevelItemText}>
                                        {firstLevelItem.name}
                                    </span>
                                </motion.div>
                            </Link>
                            {firstLevelItem.id === activeMenuLevel && 
                            makeSecondLevelMenu(menus[firstLevelMenu.findIndex(item => item.id === firstLevelItem.id)] || [], firstLevelItem.route)}
                        </li>);
                })}
            </ul>
        );
    };

    const makeSecondLevelMenu = (menu: MenuItem[], route: string) => {
        if (menu.length === 0) return <></>;
        
        return (
            <ul className={style.secondLevel}>
                {menu.map((secondLevelItem, idx) => {
                    // console.log('secondLevelItem', secondLevelItem, 'path', path,);
                    return <motion.li
                        key={secondLevelItem._id?.secondCategory}
                        className={style.secondLevelItem}
                        variants={animationVariantsForSubMenu(idx)}
                        initial="hidden"
                        animate="visible"
                    > 
                        <div className={cn({[style.secondLevelItemActive]: secondLevelItem._id === activeSUbMenuLevel?._id})}
                            tabIndex={0}
                            onClick={() => { toggleSubMenu(secondLevelItem);}}
                            onKeyDown={(e) => onKeyDownSecondLevelMenu(e, secondLevelItem)}
                            >
                            <span className={style.secondLevelItemText} >
                                {secondLevelItem._id?.secondCategory}
                            </span>
                        </div>
                        {secondLevelItem._id === activeSUbMenuLevel?._id && makeThirdLevelMenu(activeSUbMenuLevel?.pages, route)}
                    </motion.li>;
                })}
            </ul>
        );
    };

    const makeThirdLevelMenu = (activeSUbMenuLevel: PageItem[] | undefined, route: string) => {
        return (
            <ul className={style.thirdLevel}>
                {activeSUbMenuLevel?.map((page: PageItem, idx) => {
                    // console.log('page._id', page._id, 'path', path, 'page alias', page.alias);
                    return <motion.li
                        key={page._id}
                        className={style.thirdLevelItem}
                        variants={animationVariantsForSubMenu(idx)}
                        initial="hidden"
                        animate="visible">
                        <Link href={`/${route}/${page.alias}`} onClick={() => { setActivePageId(page._id); }}>
                            <div className={cn({ [style.thirdLevelItemActive]: path.includes(page.alias)
                            //page._id === activePageId 

                            }

                            )}>
                                <span className={style.thirdLevelItemText}>{page.category}</span>
                            </div>
                        </Link>
                    </motion.li>;
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