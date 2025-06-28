'use client';
import { HeaderProps } from './Header.props';
import { JSX, Suspense, useEffect, useRef, useState } from 'react';
import Hamburger from '../Hamburger/Hamburger';
import Image from 'next/image';
import ThemeButton from '../ThemeButton/ThemeButton';
import { motion } from 'motion/react';
import Search from '../Search/Search';
import Menu from '../Menu/Menu';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import style from './Header.module.css';


export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

	const pathname = usePathname();
	const [isOpened, setIsOpened] = useState<boolean>(false);
	useEffect(() => {setIsOpened(false);}, [pathname]);

	const mobileMenuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = (): void => {
		setIsOpened(!isOpened);
		!isOpened ? mobileMenuRef.current?.blur() : mobileMenuRef.current?.focus();
	};

	const swipeToClose = (e: unknown, info: { offset: { x: number } }): void => {
		if (info.offset.x < -50) setIsOpened(false);
	};
	
	return (
		<header  {...props} className={style.header}>
			<Image
				src="/Logo/LogoEvgenSmall.svg"
				alt = "Logo small"
				width={140}
				height={32}
				priority={true}
				className={style.headerLogo}/>
			<ThemeButton className={style.headerThemeBtn}/>
			<Hamburger active={isOpened} 
				className={style.burger}
				onClick={toggleMenu}
				aria-label='Mobile menu button'
				/>
			<motion.div whileFocus='focused' 
				className={cn(style.mobileMenu, {[style.active]: isOpened})}
				initial={{ x: '-100%' }}
				animate={{ x: isOpened ? 0 : '-100%' }}
				transition={{ type: 'spring', stiffness: 300, damping: 40 }}
				style={{display:"grid"}}
				drag="x"
				dragConstraints={{ left: -100, right: 0, top: 0, bottom: 0 }}
				dragDirectionLock={true}
				dragMomentum={false}
				dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
				dragElastic={0.4}
				onDragEnd={swipeToClose}
			>	
				<div className={style.mobileMenuHeader} ref={mobileMenuRef}
				onClick={toggleMenu}>
					<Image
						src="/icons/Swipe/Swipe.svg"
						alt = "Logo small"
						width={32}
						height={32}
						priority={true}
						className={style.swipeArrow}/>
					 <span>Или свайп</span>
					<Hamburger active={isOpened} 
					className={style.dynamicBurger}
					aria-label='Mobile menu button'/>
				</div>	
					<Suspense fallback={<div>Some loading....</div>}>
						<Search className={style.headerSearch} />
					</Suspense>
				
				<Menu className={style.headerMenu} />
			</motion.div>	
		</header>
	);
};