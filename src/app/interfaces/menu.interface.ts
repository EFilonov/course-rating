 
 import { TopLevelCategory } from './page.interface';
 import { JSX } from 'react';

export interface MenuItem {
    _id: {
        secondCategory: string;
    };
    isOpened?: boolean;
    pages: PageItem[];
}

export interface PageItem {
	alias: string;
	title: string;
	_id: string;
	category: string;
}
export interface FirstLevelMenuItem {
	route: string;
	name: string;
	icon: JSX.Element;
	id: number;
}