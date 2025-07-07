import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { JSX } from 'react';
import Card from '../../Card/Card';
import Divider from '../../Divider/Divider';
import ProductHeaderSkeleton from '../ProductHeaderSkeleton/ProductHeaderSkeleton';

import style from './ProductSkeleton.module.css';

const ProductSkeleton = (): JSX.Element => {
    return (
        <SkeletonTheme baseColor="#7351F5" highlightColor="#FFFFFF" duration={0.5}>
            <Skeleton height={40} borderRadius={5} className={style.skTitle}/> 
            <Card >
                <ProductHeaderSkeleton/>
                <div className={style.skeletonCardMain}>
                <Divider className={style.skDivider1}/>
                    <Skeleton height={30} borderRadius={5} className={style.skAdvTitle}/> 
                <div className={style.skContent}>
                    <Skeleton  height={100} borderRadius={5} className={style.skHh}/>
                    <Skeleton  height={100} borderRadius={5} className={style.skAdvantage}/>
                </div>
                <Divider className={style.skDivider2}/>
                <div className={style.skBtns}>
                    <Skeleton width={75} height={40} borderRadius={5} className={style.skBtn}/>
                    <Skeleton width={75} height={40} borderRadius={5} className={style.skBtn}/>
                    </div>
                </div>
            </Card>
            <Card >
                <ProductHeaderSkeleton/>
                <div className={style.skeletonCardMain}>
                <Divider className={style.skDivider1}/>
                    <Skeleton height={30} borderRadius={5} className={style.skAdvTitle}/> 
                <div className={style.skContent}>
                    <Skeleton  height={100} borderRadius={5} className={style.skHh}/>
                    <Skeleton  height={100} borderRadius={5} className={style.skAdvantage}/>
                </div>
                <Divider className={style.skDivider2}/>
                <div className={style.skBtns}>
                    <Skeleton width={75} height={40} borderRadius={5} className={style.skBtn}/>
                    <Skeleton width={75} height={40} borderRadius={5} className={style.skBtn}/>
                    </div>
                </div>
            </Card>
            
        </SkeletonTheme> 
    );
};
export default ProductSkeleton;