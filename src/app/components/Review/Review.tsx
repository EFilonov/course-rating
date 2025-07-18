import {ReviewProps} from "./Review.props";
import {JSX, memo, useState, useCallback, useEffect} from "react";
import cn from 'classnames';
import Divider from "../Divider/Divider";
import Image from "next/image";
import RateStars from "../RateStars/RateStars";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import ReviewForm from "../ReviewForm/ReviewForm";

import style from './Review.module.css';

const Review = memo(({ className,  reviews, productId}: ReviewProps): JSX.Element  => {
    const [reviewListUpdated, setReviewListUpdated] = useState(false);
    const [reviewList, setReviewList] = useState(reviews);

    // Memoize the handler to avoid unnecessary re-renders
    const handleReviewListUpdate = useCallback(() => {
        setReviewListUpdated(prev => !prev);
    }, []);

    useEffect(() => {
        fetch(`/api/form?id=${productId}`)
            .then(response => response.json())
            .then(data => setReviewList(data))
            .catch(error => console.error('Error fetching reviews:', error));
    }, [reviewListUpdated, productId]);

    return (
       <div className={cn(className, style.reviewWrapper)} > 
            {reviewList.map((review) => {
                return(
                    <div key= {review.createdAt} className={style.reviewHeader}>
                        <div className={style.reviewHeaderLeft}>
                            <Image src='/icons/Review/Review.svg'
                            alt='Review Icon'
                            width= {30}
                            height= {30}
                            priority={false}
                            className={style.reviewImg}
                            quality={70}/>
                            <div className={style.reviewName}> {`${review.name}:`} </div>
                            <div className={style.reviewTitle}> {review.title} </div>
                        </div>
                        <div className={style.reviewHeaderRight}>
                            <div className={style.reviewDate}> {format(new Date(review.createdAt), "dd MMMM yyyy", {locale: ru})}</div>
                            <RateStars isEditable={false} rate={review.rating} className={style.reviewRating}/> 
                        </div>
                        <div className={style.reviewBody}>
                            {review.description}
                        </div>
                        <Divider className={style.reviewDivider}  />
                </div>);
                
            })}
            <ReviewForm productId={productId} handleReviewListUpdate = {handleReviewListUpdate}/>
       </div>
    );
});

export default Review;