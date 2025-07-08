'use client';
import { DynamicPageTitleProps } from "./DynamicPageTitle.props";
import { JSX } from "react";
import Tag from "../Tag/Tag";
import Htag from "../Htag/Htag";
import { sortState} from "@/app/store/sortState";
import cn from 'classnames';
import ThemeButton from "../ThemeButton/ThemeButton";

import style from './DynamicPageTitle.module.css';


const DynamicPageTitle = ({ className, title, count }: DynamicPageTitleProps): JSX.Element => {
    const { sortType, setSortType } = sortState();

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, sortType: string): void => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setSortType(sortType);
        }
    };

    return (
        <div className={cn(style.title, className)}>
            <Htag tag='h1'>{title}</Htag>
            <Tag size='regular' color='grey'>{count}</Tag>
            <div className={style.sortBlock}>
                <div className={cn(style.sortItem, { [style.active]: sortType === 'rating' })}
                    tabIndex={0}
                    onClick={() => setSortType('rating')}
                    onKeyDown={(e) => handleKeyDown(e, 'rating')}>
                    По рейтингу
                </div>
                <div className={cn(style.sortItem, { [style.active]: sortType === 'price' })}
                    tabIndex={0}
                    onClick={() => setSortType('price')}
                    onKeyDown={(e) => handleKeyDown(e, 'price')}>
                    По цене
                </div>
            </div>
            <div className={style.themeButton}>
                <ThemeButton />
            </div>
        </div>
    );
};

export default DynamicPageTitle;