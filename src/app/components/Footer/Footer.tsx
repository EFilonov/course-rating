import { FooterProps } from './Footer.props';
import { JSX } from 'react';

import style from './Footer.module.css';


export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={style.footer} {...props}>
			<div className={style.container}>
					<p className={style.text}>© 2025 Your Company Name. All rights reserved.</p>
					<nav className={style.nav}>
						<a href="/privacy" target ="_blank" className={style.link}>Privacy Policy</a>
						<a href="/terms" target ="_blank" className={style.link}>Terms of Service</a>
					</nav>
				</div>
		</footer>
	);
};