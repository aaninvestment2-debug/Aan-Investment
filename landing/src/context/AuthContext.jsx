import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/api";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // CRITICAL: If returning from OAuth callback, skip the /me check.
        // AuthCallback will exchange the session_id and establish the session first.
        if (window.location.hash?.includes("session_id=")) {
            setLoading(false);
            return;
        }
        api.get("/auth/me")
            .then((r) => setUser(r.data))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const logout = async () => {
        try {
            await api.post("/auth/logout");
        } catch (e) {}
        setUser(null);
    };

    return <AuthContext.Provider value={{ user, setUser, loading, logout }}>{children}</AuthContext.Provider>;
}
