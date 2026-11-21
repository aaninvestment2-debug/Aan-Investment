import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { DEFAULT_CONTENT } from "@/lib/defaultContent";

const SiteContext = createContext(null);

export const useSite = () => useContext(SiteContext);

export function SiteProvider({ children }) {
    const [content, setContent] = useState(DEFAULT_CONTENT);
    const [faqs, setFaqs] = useState([]);

    const refresh = useCallback(async () => {
        try {
            const [c, f] = await Promise.all([api.get("/content"), api.get("/faqs")]);
            setContent({ ...DEFAULT_CONTENT, ...c.data });
            setFaqs(f.data);
        } catch (e) {
            // defaults already in place
        }
    }, []);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return <SiteContext.Provider value={{ content, faqs, refresh }}>{children}</SiteContext.Provider>;
}
