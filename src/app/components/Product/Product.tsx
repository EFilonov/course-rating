"use client";
import {ProductProps} from "./Product.props";
import {ForwardedRef, forwardRef, JSX, use, useCallback, useEffect, useMemo, useRef, useState} from "react";
import cn from 'classnames';
import Card from "../Card/Card";
import Button from "../Button/Button";
import splitByThree from "@/app/helpers/splitByThree";
import Tag from "../Tag/Tag";
import Star from "../Star/Star";
import Divider from "../Divider/Divider";
import Image from "next/image";
import Review from "../Review/Review";
import {motion, AnimatePresence} from "framer-motion";
import { useSort } from "@/app/store/sort";
import ImageBoundery from "../ErrorBounderies/ImageBoundery/ImageBoundery";
import { fixDoubleHttp } from "@/app/helpers/fixDoubleHttp";

import style from './Product.module.css';




const Product = motion.create(forwardRef(({ className, product}: ProductProps, layoutRef: ForwardedRef<HTMLDivElement>): JSX.Element  => {
	const {sortType} = useSort();

	const [isVisibleReview, setIsVisibleReview] = useState<boolean>(false);

	useEffect(() => {
		setIsVisibleReview(false);

		typeof window !== "undefined" ? window.scrollTo({ top: 0, behavior: 'smooth' }) : null;
		
	}, [ sortType]);
	
	const toggleVisibleReview = (): void => {
		setIsVisibleReview(!isVisibleReview);
	};
	
	const revieRef = useRef<HTMLFormElement>(null);

	const scrollToReview = () => {
		setIsVisibleReview(true);
	};

	useEffect(() => {
		if (isVisibleReview) {
			revieRef.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'end'
			});
		}
	}, [isVisibleReview]);

	return (
      	<div className={cn(style.productWrapper, className)} ref={layoutRef}>
			<Card className={style.product}>
				<div className={style.logo}>
					<ImageBoundery>
						<Image
							src={fixDoubleHttp(product.image)}
							alt={product.title}
							quality={70}
							priority={false}
							width={70}
							height={70}
							loading="lazy"
						/>
					</ImageBoundery>
				</div>
				<div className={style.title}>{product.title}</div>
				<div className={style.price}>
					<span>
						{/* <span className="visualyHidden">цена</span> */}
						{splitByThree(product.price)}
					</span>
					{product.oldPrice && 
          			<Tag className={style.oldPrice} color="green">
						{/* <span className="visualyHidden">скидка</span> */}
						{splitByThree(product.price - product.oldPrice)}
					</Tag>}
				</div>
				<div className={style.credit}>
					{/* <span className="visualyHidden">кредит </span> */}
					{splitByThree(product.credit)}/<span className={style.month}> мес</span>
				</div>
				<div className={style.rating}>
					<span className="visualyHidden">{product.initialRating || 0}</span>
					<a href = '#ref' onClick={scrollToReview} >
						<Star value={product.initialRating || 0} className={style.star}/>
					</a>
				</div>
				<div className={style.tags}>{product.categories.map(c => 
					<Tag key={c} className={style.category} color='ghost'>{c}</Tag>)}</div>
				<div className={style.priceTitle} aria-hidden={true}>цена</div>
				<div className={style.creditTitle} aria-hidden={true}>кредит</div>
				<div className={style.rateTitle}>
          			<a href="#ref" ></a>
        		</div>
				<Divider className={style.hr} />
				<div className={style.description}>{product.description}</div>
				<div className={style.feature}>
					{product.characteristics.map(c => (
						<div className={style.characteristics} key={c.name}>
							<span className={style.characteristicsName}>{c.name}</span>
							<span className={style.characteristicsDots}></span>
							<span className={style.characteristicsValue}>{c.value}</span>
						</div>
					))}
				</div>
				<div className={style.advBlock}>
					{product.advantages && <div className={style.advantages}>
						<div className={style.advTitle}>Преимущества</div>
						<div>{product.advantages}</div>
					</div>}
					{product.disAdvantages && <div className={style.disadvantages}>
						<div className={style.advTitle}>Недостатки</div>
						<div>{product.disAdvantages}</div>
					</div>}
				</div>
				<Divider className={cn(style.hr, style.hr2)} />
				<div className={style.actions}>
					<Button appearance="blue">Узнать подробнее</Button>
					<Button onClick={toggleVisibleReview}
						appearance="gray"
						arrow={isVisibleReview ? "down" : "right"}
						className={style.reviewButton}>
            			Читать отзывы
					</Button>
				</div>
				</Card>
				<AnimatePresence>
					{isVisibleReview && (
					<Card color="lightBlue" className={cn(style.reviewCard, { [style.visible]: isVisibleReview })}>
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.3, ease: "easeInOut" }}
						>
							<Review reviews={product.reviews} productId={product._id} ref={revieRef} />
						</motion.div>
					</Card>)}
				</AnimatePresence>
	</div>
        
    );    
}));
export default Product;