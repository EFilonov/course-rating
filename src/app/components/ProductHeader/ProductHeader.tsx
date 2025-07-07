"use client";
import { ProductProps } from "./ProductHeader.props";
import { JSX } from "react";
import splitByThree from "@/app/helpers/splitByThree";
import Tag from "../Tag/Tag";
import Star from "../Star/Star";
import cn from "classnames";
import Image from "next/image";
import ImageBoundery from "../ErrorBounderies/ImageBoundery/ImageBoundery";
import { fixDoubleHttp } from "@/app/helpers/fixDoubleHttp";


import style from './ProductHeader.module.css';
import { ta } from "date-fns/locale";


const ProductHeader = ({ onClick, className, product }: ProductProps ): JSX.Element => {

	return (
		<div className={cn(style.productHeader, className)}>
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
					{splitByThree(product.price)}
				</span>
				{product.oldPrice &&
					<Tag className={style.oldPrice} color="green">
						{splitByThree(product.price - product.oldPrice)}
					</Tag>}
			</div>
			<div className={style.credit}>
				{splitByThree(product.credit)}/<span className={style.month}> мес</span>
			</div>
			<div className={style.rating}>
				<span className="visualyHidden">{product.initialRating || 0}</span>
				<button aria-label="Go to reviews"
					tabIndex={onClick ? 0 : -1}
					className={style.starButton}
					onClick={onClick}>
					<Star value={product.initialRating || 0} className={style.star} />
				</button>
			</div>
			<div className={style.tags}>{product.categories.map(c =>
				<Tag key={c} className={style.category} color='ghost'>{c}</Tag>)}</div>
			<div className={style.priceTitle} aria-hidden={true}>цена</div>
			<div className={style.creditTitle} aria-hidden={true}>кредит</div>
		</div>

	);
};
export default ProductHeader;