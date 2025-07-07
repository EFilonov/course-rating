"use client";
import { ProductProps } from "./Product.props";
import { ForwardedRef, forwardRef, JSX, useEffect, useState } from "react";
import cn from 'classnames';
import Card from "../Card/Card";
import Button from "../Button/Button";
import Divider from "../Divider/Divider";
import Review from "../Review/Review";
import { motion, AnimatePresence } from "framer-motion";
import { sortState } from "@/app/store/sortState";
import ProductHeader from "../ProductHeader/ProductHeader";
import DetailsModal from "../DetailsModal/DetailsModal";
import { usePathname, useRouter } from "next/navigation";

import style from './Product.module.css';


const Product = motion.create(forwardRef(({ className, product }: ProductProps, layoutRef: ForwardedRef<HTMLDivElement>): JSX.Element => {
	const { sortType } = sortState();
	const router = useRouter();
	const path = usePathname();

	const [isVisibleReview, setIsVisibleReview] = useState<boolean>(false);
	const [openModal, setOpenModal] = useState<boolean>(false);

	useEffect(() => {
		setIsVisibleReview(false);
		// (typeof window !== "undefined" && path.includes('#'))  ? window.scrollTo({ top: 0, behavior: 'smooth' }) : null;
	}, [sortType]);

	const toggleVisibleReview = (): void => {
		setIsVisibleReview(!isVisibleReview);
	};

	const onStarButtonClick = () => {
			setIsVisibleReview(true);
			setTimeout(() => {
				router.push(`#${product._id}=review`);
			}, 150);
	};

	const onToggleOpenModal = () => {
		setOpenModal(!openModal);
	};
	
	return (
		<div className={cn(style.productWrapper, className)} ref={layoutRef}>
			<Card className={style.product} id = {product._id} >
				<ProductHeader className={style.pHeader} onClick={onStarButtonClick} product={product} />
				<Divider className={style.hr} />
				<div className={style.description}>{product.description}</div>
				<div className={style.table}>
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
				</div>
				<Divider className={cn(style.hr, style.hr2)} />
				<div className={style.actions}>
					<Button
						onClick={onToggleOpenModal}
						appearance="blue">Узнать подробнее</Button>
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
							<Review reviews={product.reviews} productId={product._id} />
						</motion.div>
					</Card>)}
			</AnimatePresence>
			<DetailsModal open={openModal} onClose={onToggleOpenModal}/>
		</div>

	);
}));
export default Product;