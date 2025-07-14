'use client';
import Card from '../components/Card/Card';
import Divider from '../components/Divider/Divider';
import Htag from '../components/Htag/Htag';
import { ThemeButton } from '../components/ThemeButton/ThemeButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StarsIcon from '@mui/icons-material/Stars';
import PaidIcon from '@mui/icons-material/Paid';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { useState } from 'react';
import { menuState } from '../store/menuState';
import MainPageSkeleton from '../components/Skeletons/MainPageSkeleton/MainPageSkeleton';
import TopRatedProducts from '../components/TopRatedProducts/TopRatedProducts';

import style from './Page.module.css';


const Page =  ()  => {
  const [filter, setFilter] = useState('rating');
  const allProducts = menuState((state) => state.allProducts);
  const loading = menuState((state) => state.loading);
  
  const filters = [
    { id: 1, name: 'Популярности', active: true, filter: 'rating', icon: <StarsIcon className={style.filterIcon} fontSize='large'/> },
    { id: 2, name: 'По цене', active: false, filter: 'price', icon: <PaidIcon className={style.filterIcon} fontSize='large'/> },
    { id: 3, name: 'По отзывам', active: false, filter: 'reviews', icon: <MapsUgcIcon className={style.filterIcon} fontSize='large'/> },
  ];
  
   const handleChangeFilter = (event: React.SyntheticEvent, newValue: string) => {
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
          <Htag tag='h2'>Здесь можно подобрать удобный для вас онлайн курс из широкого списка популярных категорий </Htag>
          <Divider className={style.heroDivider} />
          <div className={style.mainFilterTitle} >Топ 30 лучших курсов по:</div>
          <BottomNavigation sx={
            { width: '100%',
              background: 'transparent', 
              '& .MuiBottomNavigationAction-label': {
                color: '#7351F5',
                fontSize: 'clamp(12px, 3.5vw, 16px)',
                }
            }} 
            value={filter} 
            onChange={handleChangeFilter} 
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
          { loading ? <MainPageSkeleton/> : <TopRatedProducts products={allProducts} filter={filter}/> }
        </Card>
      </section>
      <div className={style.empty}></div>
    </div>
  );
};

export default Page;
