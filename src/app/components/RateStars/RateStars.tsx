import { rateProps } from "./RateStars.props";
import { JSX, useState, ForwardedRef, forwardRef, useEffect } from "react";
import Star from './../../../../public/icons/RateStar/Star.svg';


import cn from 'classnames';
import style from './RateStars.module.css';

const RateStars = forwardRef(({ className, isEditable, errors, rate = 0, setRating, ...props }: rateProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    
    const starRatingArray: Array<JSX.Element> = new Array(5)
        .fill(
            <span className={style.star} >
                <Star />
            </span>
        );

    const [starLightPosition, setStarLightPosition] = useState<number>(rate);

    useEffect(() => {                   //при сбросе формы
        setStarLightPosition(rate || 0); 
    }, [rate]);

    const elements: Array<JSX.Element> = starRatingArray.map((item, index) => {

        return (
            <span tabIndex={isEditable ? 0 : -1}
                onMouseEnter={() => { setStarLightPosition(index + 1); }}
                onMouseLeave={() => { setStarLightPosition(rate || 0); }}
                onClick={() => {
                    if (isEditable && setRating) {
                        setRating(index + 1);
                    }
                }}
                onKeyDown={(e) => {
                    if (isEditable && setRating && (e.code === 'Enter' || e.code === 'Space')) {
                        setRating(index + 1);
                    }
                }}
                key={index} className={cn(style.span, {
                    [style.rated]: (index + 1 <= rate) || (index < starLightPosition),
                })}>
                <Star key={index} className={cn(style.star)} />
            </span>
        );
    });

    return (
        <div {...props} className={cn(className, style.starsGroup)} ref={ref}>
            {elements}
            <span className={style.validationMessage}>{errors}</span>
        </div>
    );
});

export default RateStars;    