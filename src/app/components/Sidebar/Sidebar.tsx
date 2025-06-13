import { SidebarProps } from './Sidebar.props';
import { JSX, Suspense } from 'react';
import cn from 'classnames';
// import {Logo} from './../../img/Logo/logo-transparent.png';
import style from './Sidebar.module.css';
import Menu from '../Menu/menu';
import Link from 'next/link';

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
			<div className={style.nav} {...props}>
				<div className={style.logo}>
					<Link href='/' className={cn(style.logoLink, className)}>
						<img src="/Logo/LogoEvgen.svg" alt='Logo' className={style.logoImage} />
					</Link>
				</div>
				<div className={style.search}>
					<input type="text" name="search" id="search" placeholder='Поиск ...' className={style.searchInput} />
					<img src="./icons/search/Search-icon.svg" alt="Search button" className={style.searchImg} />
				</div>
					
				<Menu />
			</div>
	);
};