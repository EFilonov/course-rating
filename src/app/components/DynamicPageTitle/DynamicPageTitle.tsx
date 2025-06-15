'use client';
import {DynamicPageTitleProps} from "./DynamicPageTitle.props";
import {JSX} from "react";
import Tag from "../Tag/Tag";
import Htag from "../Htag/Htag";
import { useSort } from "@/app/store/sort";
import cn from 'classnames';

import style from './DynamicPageTitle.module.css';


const DynamicPageTitle = ({ className, title, count }: DynamicPageTitleProps): JSX.Element  => {
    const {sortType, setSortType} = useSort();
    
    return (
       <div className={cn(style.title, className)}>
                <Htag tag='h1'>{title}</Htag>
                <Tag size='regular' color='grey'>{count}</Tag>
                <div className={style.sortBlock}>
                    <div className={cn(style.sortItem, {[style.active]: sortType === 'rating'})}
                         onClick={() => setSortType('rating')}>
                        По рейтингу
                    </div>
                    <div className={cn(style.sortItem, {[style.active]: sortType === 'price'})}
                         onClick={() => setSortType('price')}>
                        По цене
                    </div>
                    
                </div>
        </div>
    );
};

export default DynamicPageTitle;