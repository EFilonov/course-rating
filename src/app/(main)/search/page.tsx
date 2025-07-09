'use client';
import { ThemeButton } from "@/app/components/ThemeButton/ThemeButton";
import SearchResults from "@/app/components/SearchResults/SearchResults";
import { Suspense } from "react";
import MainPageSkeleton from "@/app/components/Skeletons/MainPageSkeleton/MainPageSkeleton";

import style from './SearchPage.module.css';


const SearchPage = (): React.JSX.Element => {
    return (
        <div className={style.searchPage}> 
            <div className={style.searchHeader}>
                <h1 className = {style.searchHeader} >Результаты поиска:</h1>
                <ThemeButton className={style.searchThemeButton} />
            </div>
                <Suspense fallback={<MainPageSkeleton/>}>
                    <SearchResults/>
                </Suspense>
            <div className={style.empty}></div>    
        </div>
    );
};

export default SearchPage;