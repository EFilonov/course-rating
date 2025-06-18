"use client";
import {ProductProps} from "./Product.props";
import {JSX, useMemo, useState} from "react";
import cn from 'classnames';
import Card from "../Card/Card";
import Button from "../Button/Button";
import splitByThree from "@/app/helpers/splitByThree";
import Tag from "../Tag/Tag";
import Star from "../Star/Star";
import Divider from "../Divider/Divider";
import Image from "next/image";

import style from './Product.module.css';
import Review from "../Review/Review";

const Product = ({ className, product}: ProductProps): JSX.Element  => {

	const [isVisibleReview, setIsVisibleReview] = useState<boolean>(false);
	
	const toggleVisibleReview = (): void => {
		setIsVisibleReview(!isVisibleReview);
	};


	const getRate = useMemo(() => {
		const roundToOneDecimal = (val: number): number => {
			return Math.round(val * 10) / 10;
		};

		if (product.reviewAvg !== null && product.reviewAvg !== undefined) {
			return roundToOneDecimal(product.reviewAvg);
		} else if (product.initialRating) {
			return roundToOneDecimal(product.initialRating);
		}
		return 0;
	}, [product.reviewAvg, product.initialRating]);

	return (
      	<div className={cn(style.productWrapper, className)}>
			<Card className={style.product}>
				<div className={style.logo}>
					<Image
						src={product.image}
						alt={product.title}
						quality={70}
						priority={false}
						width={70}
						height={70}
						loading="lazy"
					/>
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
					<span className="visualyHidden">{getRate}</span>
					<Star value={getRate} className={style.star}/>
				</div>
				<div className={style.tags}>{product.categories.map(c => <Tag key={c} className={style.category} color='ghost'>{c}</Tag>)}</div>
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
			<Card color="lightBlue" className={cn(style.reviewCard, {[style.visible]: isVisibleReview})}>
				<Review reviews={product.reviews} />
			</Card>
		</div>
        
    );    
};
export default Product;