import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { JSX } from 'react';
import style from './ProductHeaderSkeleton.module.css';

const ProductHeaderSkeleton = (): JSX.Element => {
    return (
        <SkeletonTheme baseColor="#7351F5" highlightColor="#FFFFFF" duration={0.5}>
            <div className={style.skelWrp}>
                <div className={style.image} ><Skeleton height={75} width={75} borderRadius={5}/></div>
                <div className={style.titleTags}>
                    <Skeleton height={30} borderRadius={5} className={style.title} />
                    <Skeleton height={20} borderRadius={5} className={style.tags} />
                </div>
                <div className={style.prices}>
                    <Skeleton height={30} borderRadius={5} className={style.priceValue} />
                    <Skeleton height={20} borderRadius={5} className={style.oldPrice} />
                </div>
                <div className={style.rating}>
                    <Skeleton width={30} height={30} borderRadius={5} className={style.rating} />
                </div>
            </div>
        </SkeletonTheme>
    );
};
export default ProductHeaderSkeleton;