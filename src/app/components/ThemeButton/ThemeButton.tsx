'use client';
import { ThemeButtonProps } from "./ThemeButton.props";
import React, { useState, useEffect, use } from "react";
import cn from "classnames";
import { useTheme } from "next-themes";
import style from "./ThemeButton.module.css";

export const ThemeButton = ({ className }: ThemeButtonProps) => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // Ensure the component is mounted before accessing the theme
        setMounted(true);
    }, []);
    // If the component is not mounted, return null to avoid hydration mismatch
    if (!mounted) {return null;}

    return (
        <button aria-label="Toggle theme"
            className={cn(style.themeToggleBtn, className, { [style.active]: theme === 'light' })}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <div className={style.sunrays}>
                <div className={style.sunraysAfter}></div>
                <div className={style.sunraysBefore}></div>
            </div>
            <div className={style.maincircle}>
                <div className={style.maincircleInner}></div>
            </div>
        </button>
    );
};

