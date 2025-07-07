'use client';
import Card from '../components/Card/Card';
import Divider from '../components/Divider/Divider';
import Htag from '../components/Htag/Htag';
import ThemeButton from '../components/ThemeButton/ThemeButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StarsIcon from '@mui/icons-material/Stars';
import PaidIcon from '@mui/icons-material/Paid';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { useRef, useState } from 'react';
import { menuState } from '../store/menuState';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import {sortProducts} from '../helpers/sortFn';
import { getUniqueByProp } from '../helpers/getUniqueByProp';
import { motion, AnimatePresence } from 'framer-motion';
import MainPageSkeleton from '../components/Skeletons/MainPageSkeleton/MainPageSkeleton';
import { useRouter } from 'next/navigation';
import { ProductModel } from '../interfaces/product.interface';

import style from './Page.module.css';
import { tr } from 'date-fns/locale';


const Page =  ()  => {
  const [filter, setFilter] = useState('rating');
  const allProducts = menuState((state) => state.allProducts);
  const loading = menuState((state) => state.loading);
  const router = useRouter();
  const [showTooltip, setShowTooltip] = useState(false);

  const onProductClick = (product : ProductModel) => {
    router.push(`${product.href}#${product._id}`);
  };

  const handleMenuLevelKeyDown = (e: React.KeyboardEvent, product : ProductModel) => {
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
             router.push(`${product.href}#${product._id}`);
          }
      };
  
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleTooltipMove = ( e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
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
 
const renderTopRatedProducts = () => {
    const uniqueProducts = getUniqueByProp(allProducts, 'title');
    return (
      <AnimatePresence>
        {showTooltip && <motion.div className = {style.mouseTooltip}
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
              <ProductHeader product={product}/>
            </Card>
          </motion.div>
          );
        })}
      </AnimatePresence>
    );
  };

  const filters = [
    { id: 1, name: 'Популярности', active: true, filter: 'rating', icon: <StarsIcon className={style.filterIcon} fontSize='large'/> },
    { id: 2, name: 'По цене', active: false, filter: 'price', icon: <PaidIcon className={style.filterIcon} fontSize='large'/> },
    { id: 3, name: 'По отзывам', active: false, filter: 'reviews', icon: <MapsUgcIcon className={style.filterIcon} fontSize='large'/> },
  ];
  
   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setFilter(newValue);
  };
      
  
  return (
    <div className={style.mainWrapper}>
      <div className={style.mainTitle}>
        <Htag tag='h1'> Добро пожаловать в наш рейтинг курсов !</Htag>
        <ThemeButton className={style.mainThemeButton} />
      </div>
      <section className={style.hero}>
        <Card  className={style.heroCard} >
          <Htag tag='h3'>Здесь можно подобрать удобный для вас онлайн курс из широкого списка популярных категорий </Htag>
          <Divider className={style.heroDivider} />
          <div className={style.mainFilterTitle} >Топ 5 популярных курсов по:</div>
          <BottomNavigation sx={
            { width: '100%',
              background: 'transparent', 
              '& .MuiBottomNavigationAction-label': {
                color: '#7351F5',
                fontSize: 'clamp(12px, 3.5vw, 16px)',
                }
            }} 
            value={filter} 
            onChange={handleChange} 
            className={style.mainFilter}>
            { filters.map(item => {
              return (
                 <BottomNavigationAction
                    label={item.name}
                    key={item.id}
                    value={item.filter}
                    icon={item.icon}
                    className={style.mainFilterButton}
                    />
              );
            })}
          </BottomNavigation> 
          { loading ? <MainPageSkeleton/> : renderTopRatedProducts() }
        </Card>
      </section>
    </div>
  );
};

export default Page;
