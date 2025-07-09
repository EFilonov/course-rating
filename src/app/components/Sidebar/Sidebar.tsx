import { SidebarProps } from './Sidebar.props';
import { JSX, Suspense } from 'react';
import cn from 'classnames';
import { Menu } from '../Menu/nu';
import Link from 'next/link';
import Search from '../Search/Search';
import Image from 'next/image';

import style from './Sidebar.module.css';


export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
	return (
		<div className={style.nav} {...props}>
			<div className={style.logo}>
				<Link href="/" className={cn(style.logoLink, className)}>
					<Image
						src="/Logo/LogoEvgen.svg"
						alt='Logo'
						priority={true}
						className={style.logoImage}
						quality={70}
						width={100}
						height={100}
					/>
				</Link>
			</div>
			<Suspense fallback={<div>Some loading....</div>}>
				<Search onMobileMenuClose={() => { }} />
			</Suspense>
			<Menu />
		</div>
	);
};