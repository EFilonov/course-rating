import { useEffect, useState } from "react";

export const useScrollY = (): number => {
    const [scrollY, setScrollY] = useState<number>(0);
    const isBrowser = typeof window !== "undefined";

    useEffect(() => {
        const handleScroll = () => {
            if (!isBrowser) return;
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll), { passive: true };
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollY;
};