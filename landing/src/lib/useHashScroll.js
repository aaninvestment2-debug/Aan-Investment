import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenis } from "@/lib/lenisStore";

export function useHashScroll() {
    const { hash, pathname } = useLocation();
    useEffect(() => {
        if (!hash) return;
        const timer = setTimeout(() => {
            const el = document.getElementById(hash.slice(1));
            if (!el) return;
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(el, { offset: -96 });
            else el.scrollIntoView({ behavior: "smooth" });
        }, 350);
        return () => clearTimeout(timer);
    }, [hash, pathname]);
}
