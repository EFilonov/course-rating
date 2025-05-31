import { FooterProps } from './Footer.props';
import { JSX } from 'react';
import style from './Footer.module.css';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer {...props}>
			Foooter     Foooter      Foooter
		</footer>
	);
};