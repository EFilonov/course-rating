import { JSX, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ProductModel } from '@/app/interfaces/product.interface';
import { sortProducts } from '@/app/helpers/sortFn';
import Card from '../Card/Card';
import { getUniqueByProp } from '@/app/helpers/getUniqueByProp';
import ProductHeader from '../ProductHeader/ProductHeader';
import { TopRatedProductsProps } from './TopRatedProducts.props';

import style from './TopRatedProducts.module.css';


const TopRatedProducts = ({ filter = 'rating', products}: TopRatedProductsProps): JSX.Element => {

  const [showTooltip, setShowTooltip] = useState(false);
  const router = useRouter();

  const onProductClick = (product: ProductModel) => {
    router.push(`${product.href}#${product._id}`);
  };

  const handleMenuLevelKeyDown = (e: React.KeyboardEvent, product: ProductModel) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(`${product.href}#${product._id}`);
    }
  };

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleTooltipMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.left = e.clientX + 15 + "px";
      tooltip.style.top = e.clientY - 4 + "px";
      tooltip.style.display = 'block';
    }
    setShowTooltip(true);
  };

  const handleTooltipLeave = () => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      tooltip.style.display = 'none';
      setShowTooltip(false);
    }
  };

  const uniqueProducts = getUniqueByProp(products, 'title');

  return (
    <AnimatePresence >
      {showTooltip && <motion.div className={style.mouseTooltip}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "anticipate" }}
        ref={tooltipRef}>Просмотр в рейтинге
      </motion.div>}
      {sortProducts(uniqueProducts, filter).map((product, index) => {
        if (index >= 30) return null; // Limit to top products count
        return (
          <motion.div className={style.prductHdrItem}
            onMouseMove={e => handleTooltipMove(e, index)}
            onMouseLeave={handleTooltipLeave}
            onClick={() => onProductClick(product)}
            onKeyDown={(e) => handleMenuLevelKeyDown(e, product)}
            key={product._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
            tabIndex={0}
            layout>
            <Card className={style.product} >
              <ProductHeader product={product} />
            </Card>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default TopRatedProducts;