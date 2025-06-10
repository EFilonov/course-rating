import React from 'react';
import cn from 'classnames';
import styles from './CourcesSkeleton.module.css';

export default function CourseCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={cn(styles.skeleton, styles.title)} />
      <div className={cn(styles.skeleton, styles.tags)} />
      <div className={cn(styles.skeleton, styles.description)} />
      <div className={cn(styles.skeleton, styles.description, styles.short)} />
      <div className={cn(styles.skeleton, styles.logo)} />
      <div className={cn(styles.skeleton, styles.row)} />
      <div className={cn(styles.skeleton, styles.row)} />
      <div className={cn(styles.skeleton, styles.row)} />
      <div className={cn(styles.skeleton, styles.pros)} />
      <div className={cn(styles.skeleton, styles.cons)} />
      <div className={cn(styles.skeleton, styles.buttons)} />
    </div>
  );
}