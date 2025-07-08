"use client";
import {SearchProps} from "./Search.props";
import {JSX, useCallback, useEffect, useState} from "react";
import cn from 'classnames';
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { IFormInput } from "@/app/interfaces/IFormInput.interface";

import style from './Search.module.css';

const Search = ({  children, onMobileMenuClose, className, ...props }: SearchProps): JSX.Element  => {
   
    const router = useRouter(); 
    const searchParams = useSearchParams();
    const { register, handleSubmit, reset, formState, formState : {isSubmitSuccessful, errors} } = useForm<IFormInput>();
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
            return params.toString().toLowerCase().trim();
    },[searchParams]);

    const onSearch = useCallback((data: IFormInput): void => {
        onMobileMenuClose();
        const { search } = data;
        if (typeof search === 'string') {
            router.push(`/search?${createQueryString('q', search)}`);
        }
    }, [router, createQueryString]);

    useEffect(() => {
            if (isSubmitSuccessful) {
                reset({ search: '' });
            }
        }),[ formState, reset];
    

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>):void => {
        if (e.key === 'Enter') {
            onMobileMenuClose();
            handleSubmit(onSearch)
            ();
        }
    }, [onSearch]);

    return (
        <div className={cn(style.search, className, {[style.active]: errors.search})} {...props}>
            <input type="text" 
                id = {"search"}
                placeholder={isSubmitSuccessful ? errors.search?.message : 'Поиск...'} 
                className={style.searchInput}
                aria-label="Search input"
                onKeyDown={(e) => handleKeyDown(e)}
                {...register('search', {
                    required: 'Введите текст для поиска',
                    minLength: {
                        value: 3,
                        message: 'Минимум 3 символа'
                    }
                })}
                />
            <button type="submit" 
                className={style.searchButton} 
                aria-label='Search button'
                onClick={handleSubmit(onSearch)}
                >
                <img src="/icons/search/Search-icon.svg" alt="Search button" className={style.searchImg} />
            </button>
            {errors.search && (
            <span className={style.errorMessage}>{errors.search.message}</span>
            )}
        </div>
        
    );
};
export default Search;