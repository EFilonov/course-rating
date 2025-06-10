import { SidebarProps } from './Sidebar.props';
import { JSX, Suspense } from 'react';
import cn from 'classnames';

import style from './Sidebar.module.css';
import Menu from '../Menu/menu';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
		<Menu />
		</Suspense>
	);
};