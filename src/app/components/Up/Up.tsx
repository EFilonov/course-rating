'use client';
import {JSX, useEffect} from "react";
import Image from "next/image";
import { useAnimation, motion } from "motion/react";
import { useScrollY } from "@/app/hooks/useScrollY";

import style from './Up.module.css';

const Up = (): JSX.Element  => {
    const controls = useAnimation();
    const y = useScrollY();
    
    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        controls.start({
            opacity: y / document.body.scrollHeight 
        });
    }, [y]);

    return (
        <motion.button className={style.up} 
            onClick={scrollToTop}
            animate={controls}
            initial={{ opacity: 0 }}
            aria-label="Scroll to top">
            <Image
                src="/icons/Up/Up.svg"
                alt="UpIcon"
                width={28}
                height={28}
                className={style.upIcon}
                loading="lazy"/>
        </motion.button>    
    );
};

export default Up;