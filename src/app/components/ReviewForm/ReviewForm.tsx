import {ReviewFormProps} from "./ReviewForm.props";
import {JSX, useEffect,  useState} from "react";
import cn from 'classnames';
import TextArea from "../TextArea/TextArea";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Image from "next/image";
import RateStars from "../RateStars/RateStars";
import { useForm, Controller } from "react-hook-form";
import { IFormInput } from "@/app/interfaces/IFormInput.interface";

import style from './ReviewForm.module.css';


const ReviewForm = ({productId}: ReviewFormProps): JSX.Element  => {
    
    const [submitted, setSubmitted] = useState<boolean>(false);

    const initialState: IFormInput = {
        name: '',
        title: '',
        description: '',
        rating: 0
    };
    const { register, handleSubmit, control, reset, formState, formState : {isSubmitSuccessful, errors} } = useForm<IFormInput>({defaultValues: initialState });
    
    const onSubmit = (data: IFormInput) => {
        fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data, id: productId, createdAt: new Date()})
        });
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            setSubmitted(true);
            reset({...initialState});
        }
        // setFocus('name'); // Устанавливаем фокус mame ломает scrollintoView
    },[ formState, reset]);

    const onHandleSubmit = ():void  => {
       setSubmitted(false);
    };

    return (
       <> 
        <form onSubmit={handleSubmit(onSubmit)} 
            id = {`${productId}=review`}
            className={style.reviewForm}>
            <div className= {style.rateFeedback} >Оценка</div>
            <Controller
                control={control}
                rules={{required: { value: true, message: 'Оценка обязательна!' },
                            min: { value: 1, message: 'Не менее 1 звезды...'}}} 
                name="rating"
                render={({ field, fieldState }) => (
                    <RateStars 
                        isEditable={true}
                        setRating={field.onChange}
                        rate={field.value}
                        className={style.feedbackStars}
                        errors={fieldState.error?.message}/>
                )}
            />
            <Input className={style.reviewInputName}
                id={"name"}
                type="text"
                placeholder="Ваше имя"
                {...register("name", { 
                    required: { value: true, message: 'Имя обязательно!' }, 
                    maxLength: { value: 20, message: 'Не больше 20 символов...' },
                    minLength: { value: 2, message: 'Не менее 2 символов...' },
                    
                    })}
                validationMessage={errors.name?.message}/>
            <Input className={style.reviewInputTitle}
                id={'title'}
                type="text"
                placeholder="Заголовок отзыва"
                {...register("title", { 
                    required: { value: true, message: 'Заголовок обязательно!' }, 
                    maxLength: { value: 60, message: 'Не больше 60 символов...' },
                    minLength: { value: 5, message: 'Не менее 5 символов...' },
                    })}
                validationMessage={errors.title?.message}
                />
            <TextArea
                className={style.reviewTextarea}
                placeholder="Текст отзыва"
                {...register("description", { 
                    required: { value: true, message: 'Текст пожалуйст!' }, 
                    maxLength: { value: 360, message: 'Не больше 360 символов...' },
                    minLength: { value: 3, message: 'Не менее 3 символов...' },
                })}
                validationMessage={errors.description?.message}
                
            />
            <Button className={style.reviewButton} type="submit" appearance={"blue"} >Отправить</Button>
            <span className={style.reviewInfo}>* Перед публикацией отзыв пройдет проверку модератором</span>
        </form>
            <div className = {cn(style.submitted, {[style.submittedVisible]:  submitted})} >
                <div className={style.submitedTitle}>Ваш отзыв отправлен !</div>
                <div className={style.submittedText}>Мы скоро опубликуем его после проверки.</div>
                <button className ={style.closeBtn}
                    onClick={onHandleSubmit}>
                    <Image src='/icons/Review/Close.svg'
                        alt='Close Icon'
                        width= {10}
                        height= {10}
                        priority={false}
                        className={style.closeImg}
                        quality={70}/>
                </button>
            </div>
       </>


    );
};

export default ReviewForm;