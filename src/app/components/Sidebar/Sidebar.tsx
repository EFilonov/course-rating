import { SidebarProps } from './Sidebar.props';
import { JSX } from 'react';
import cn from 'classnames';

import style from './Sidebar.module.css';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<nav  {...props}>
			sidebar
			sidebar
			sidebar
		</nav>
	);
};