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
import { useState } from 'react';
import { menuState } from '../store/menuState';
import ProductHeader from '../components/ProductHeader/ProductHeader';
import {sortProducts} from '../helpers/sortFn';
import { getUniqueByProp } from '../helpers/getUniqueByProp';
import { motion, AnimatePresence } from 'framer-motion';
import MainPageSkeleton from '../components/Skeletons/MainPageSkeleton/MainPageSkeleton';

import style from './Page.module.css';


const Page =  ()  => {
  const [filter, setFilter] = useState('rating');
  const allProducts = menuState((state) => state.allProducts);
  const loading = menuState((state) => state.loading);
  
  const renderTopRatedProducts = () => {
    const uniqueProducts = getUniqueByProp(allProducts, 'title');
    return (
      <AnimatePresence>
        {sortProducts(uniqueProducts, filter).map((product, index) => {
          if (index >= 30) return null; // Limit to top 5 products
          return (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "anticipate" }}
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
