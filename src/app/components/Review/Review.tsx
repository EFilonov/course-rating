import {ReviewProps} from "./Review.props";
import {JSX, useState} from "react";
import cn from 'classnames';
import TextArea from "../TextArea/TextArea";
import Divider from "../Divider/Divider";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Image from "next/image";
import RateStars from "../RateStars/RateStars";
import {format} from "date-fns";
import {ru} from "date-fns/locale";

import style from './Review.module.css';

const Review = ({ className,  reviews}: ReviewProps): JSX.Element  => {
    const [rating, setRating] = useState<number>(0);
    
    return (
       <div className={cn(className, style.reviewWrapper)} > 
            {reviews.map((review) => {
                return(
                    <div key= {review._id} className={style.reviewHeader}>
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
                        <Divider className={style.reviewDivider} />
                </div>);
            })}


            <form className={style.reviewForm}>
                <div className= {style.rateFeedback}>Оценка</div>
                <RateStars 
                    isEditable={true} 
                    rate={rating} 
                    setRating = {setRating}
                    className={style.feedbackStars} /> 
                <Input
                    className={style.reviewInputName}
                    type="text"
                    placeholder="Ваше имя"/>
                <Input
                    className={style.reviewInputTitle}
                    type="text"
                    placeholder="Заголовок отзыва"/>
                <TextArea
                    className={style.reviewTextarea}
                    placeholder="Текст отзыва"/>
                <Button className={style.reviewButton} type="submit" appearance={"blue"}>Отправить</Button>
                <span className={style.reviewInfo}>* Перед публикацией отзыв пройдет проверку модератором</span>
            </form>
       </div>


    );
};

export default Review;