"use client";
import React, { useState, useEffect, use } from 'react';
import {MenuLvlActive } from '../../interfaces/menu.interface';
import cn from 'classnames';
import Link from 'next/link';
import { firstLevelMenu } from './constants/firstLevelMenu';
import { motion } from "motion/react";
import { MenuProps } from './Menu.props';
import { usePathname } from 'next/navigation';
import { menuState } from '@/app/store/menuState';
import { getUniqueByProp } from '@/app/helpers/getUniqueByProp';

import style from './Menu.module.css';
import { FlatMenuState } from '@/app/interfaces/menuState.interface';


const Menu = ({className}: MenuProps): React.JSX.Element => {
    const path = usePathname();
    const flatMenu = menuState((state) => state.flatMenu);

    const [menuLvlActive, setMenuLvlActive] = useState<MenuLvlActive>({
        first: undefined,
        second: undefined
        });

    const defineActiveLvlByPath = (path: string) => {
        const arrFromPath = path.split('/');
        if (arrFromPath.length < 3) return;
        const flatItem = flatMenu.find(item => item.thirdLvl === arrFromPath[2]);
        if (flatItem?.firstLvl && flatItem.secondLvlName) {
            return setMenuLvlActive({
                ...menuLvlActive,
                first: flatItem.firstLvl,
                second: flatItem.secondLvlName,
            });
        } 
    };

    useEffect(() => {
        defineActiveLvlByPath(path);
    }, [path, flatMenu]);

    
    const { first, second } = menuLvlActive;

    const handleMenuLevel = (level: 'first' | 'second', value?: string) => {
        setMenuLvlActive((prev) => {
            const newState = { ...prev };
            if (prev[level] === value) {
                if (level === 'first') return { first: undefined, second: undefined, third: undefined };
                if (level === 'second') return { ...prev, second: undefined, third: undefined };
            } else {
                if (level === 'first') return { first: value, second: undefined, third: undefined };
                if (level === 'second') return { ...prev, second: value, third: undefined };
            }
            return newState;
        });
    };

    const handleMenuLevelKeyDown = (e: React.KeyboardEvent, level: 'first' | 'second', value?: string ) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleMenuLevel(level, value);
            ; // Reset scroll position to the top
        }
    };

    const animationVariantsForSubMenu = (idx: number) => ({
        hidden: { opacity: 0, x: -15 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.1 + idx * 0.04 } }
    });

    
    const makeFirstLevelMenu = () => (
        <ul className={cn(style.firstLevel, className)}>
            {firstLevelMenu.map((firstLevelItem, idx) => (
                <li key={firstLevelItem.id}>
                    <Link
                        href={``}
                        onKeyDown={e => handleMenuLevelKeyDown(e, 'first', firstLevelItem.route)}
                        onClick={() => handleMenuLevel('first', firstLevelItem.route)}
                    >
                        <motion.div
                            className={cn(style.firstLevelItem, { [style.firstLevelItemActive]: firstLevelItem.route === first })}
                            variants={animationVariantsForSubMenu(idx)}
                            initial="hidden"
                            animate="visible"
                            layout
                        >
                            {firstLevelItem.icon}
                            <span className={style.firstLevelItemText}>{firstLevelItem.name}</span>
                        </motion.div>
                    </Link>
                    {firstLevelItem.route === first &&
                        makeSecondLevelMenu(flatMenu.filter(item => item.firstLvl === firstLevelItem.route))}
                </li>
            ))}
        </ul>
    );

    const makeSecondLevelMenu = (secondLevelMenu: FlatMenuState[]) => {
        if (secondLevelMenu.length === 0) return <></>;

        return (
            <ul className={style.secondLevel}>
                {getUniqueByProp(secondLevelMenu, 'secondLvlName').map((secondLevelItem, idx) => (
                    <li key={secondLevelItem.secondLvlName} className={style.secondLevelItem}>
                        <motion.div
                            className={cn({ [style.secondLevelItemActive]: secondLevelItem.secondLvlName === second })}
                            key={secondLevelItem.href}
                            variants={animationVariantsForSubMenu(idx)}
                            initial="hidden"
                            animate="visible"
                            layout
                            tabIndex={0}
                            onClick={() => handleMenuLevel('second', secondLevelItem.secondLvlName)}
                            onKeyDown={e => handleMenuLevelKeyDown(e, 'second', secondLevelItem.secondLvlName)}
                        >
                            <span className={style.secondLevelItemText}>{secondLevelItem.secondLvlName}</span>
                        </motion.div>
                        {secondLevelItem.secondLvlName === second &&
                            makeThirdLevelMenu(flatMenu.filter(item => item.secondLvlName === second))}
                    </li>
                ))}
            </ul>
        );
    };

    const makeThirdLevelMenu = (thirdLevelMenu: FlatMenuState[]) => (
        <ul className={style.thirdLevel}>
            {thirdLevelMenu.map((thirdLevelItem, idx) => (
                <motion.li
                    key={thirdLevelItem.thirdLvlId}
                    className={style.thirdLevelItem}
                    variants={animationVariantsForSubMenu(idx)}
                    initial="hidden"
                    animate="visible"
                >
                    <Link href={`/${thirdLevelItem.firstLvl}/${thirdLevelItem.thirdLvl}`}>
                        <div 
                            className={cn({[style.thirdLevelItemActive]: path.includes(thirdLevelItem.thirdLvl)})}
                            tabIndex={0}>
                            <span className={style.thirdLevelItemText}>{thirdLevelItem.thirdLvlName}</span>
                        </div>
                    </Link>
                </motion.li>
            ))}
        </ul>
    );

    return (
        <nav className="menu">
            {makeFirstLevelMenu()}
        </nav>
    );
};

export default Menu;
