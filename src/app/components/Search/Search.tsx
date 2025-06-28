"use client";
import {SearchProps} from "./Search.props";
import {JSX, useCallback, useState} from "react";
import cn from 'classnames';
import { useRouter, useSearchParams } from "next/navigation";

import style from './Search.module.css';

const Search = ({  children, className, ...props }: SearchProps): JSX.Element  => {

    const [search, setSearch] = useState<string>('');   
    const router = useRouter(); 
    const searchParams = useSearchParams();
    
    const createQueryString = useCallback(
        (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
            return params.toString();
    },[searchParams]);

    const onSearch = useCallback((): void => {
        if (search.trim() || search.length > 0) {
            router.push(`/search?${createQueryString('q', search)}`);
        }
        setSearch('');
    }, [search, router, createQueryString]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>):void => {
        if (e.key === 'Enter') {
            onSearch();
        }
    }, [onSearch]);

    return (
        <div className={cn(style.search, className)} {...props}>
            <input type="text" 
                name="search" 
                placeholder='Поиск ...' 
                className={style.searchInput}
                value={search}
                aria-label="Search input"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e) }
                 />
            <button type="submit" 
                className={style.searchButton} 
                aria-label='Search button'
                onClick={onSearch}
                
                >
                <img src="/icons/search/Search-icon.svg" alt="Search button" className={style.searchImg} />
            </button>
        </div>
        
    );
};
export default Search;