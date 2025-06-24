import { HeaderProps } from './Header.props';
import { JSX } from 'react';
import Hamburger from '../Hamburger/Hamburger';


import style from './Header.module.css';
import ThemeButton from '../ThemeButton/ThemeButton';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	return (
		<header  {...props} className={style.header}>
			<ThemeButton className={style.themeBtn}/>
			<Hamburger className={style.burger}/>
		</header>
	);
};