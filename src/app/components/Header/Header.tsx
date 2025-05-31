import { HeaderProps } from './Header.props';
import { JSX } from 'react';
import style from './Header.module.css';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	return (
		<header  {...props}>
			header header header
		</header>
	);
};