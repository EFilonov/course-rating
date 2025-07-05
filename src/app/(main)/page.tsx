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
import { useEffect, useState } from 'react';
import { menuState } from '../store/menuState';


import style from './Page.module.css';
import ProductHeader from '../components/ProductHeader/ProductHeader';


const Page =  ()  => {
  const [filter, setFilter] = useState('rating');
   const allProducts = menuState((state) => state.allProducts);
   const loading = menuState((state) => state.loading);
  


  const renderTopRatedProducts = () => {
    return allProducts.map((product, index) => {
      if (index >= 30) return null; // Ограничиваем вывод первыми 5 продуктами
      return (
        <Card key={index} className={style.product}>
          
          <ProductHeader product={product} />
          
        </Card>
      );  

    }
    );
  };

  useEffect(() => {
    // Здесь можно добавить логику для фильтрации продуктов по выбранному фильтру
    // Например, если filter изменился, то можно обновить список продуктов
    console.log(loading, 'Loading state');
  }, [loading]);

  
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

      {/* Hero */}
      <section className={style.hero}>
        <Card  className={style.heroCard}>
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
        </Card>
        { loading ? <h1>LOADING</h1> : renderTopRatedProducts() }

       
      </section>

      {/* Popular Courses */}
      {/* <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Популярные курсы</h2>
        <div className={styles.grid}>
          {courses.map((course, index) => (
            <div key={index} className={styles.card}>
              <img src={course.image} alt={course.title} className={styles.cardImage} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{course.title}</h3>
                <p className={styles.cardText}>{course.description}</p>
                <div className={styles.buttonGroup}>
                  <a href="#" className={classNames(styles.button, styles.primary)}>Узнать подробнее</a>
                  <a href="#" className={classNames(styles.button, styles.secondary)}>Читать отзывы</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Page; 
