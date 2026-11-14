import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AuthCallback() {
    const location = useLocation();
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const processed = useRef(false);

    useEffect(() => {
        if (processed.current) return;
        processed.current = true;
        const sessionId = new URLSearchParams(location.hash.replace(/^#/, "")).get("session_id");
        if (!sessionId) {
            navigate("/admin/login", { replace: true });
            return;
        }
        api.post("/auth/session", { session_id: sessionId })
            .then((r) => {
                setUser(r.data);
                navigate("/admin", { replace: true, state: { user: r.data } });
            })
            .catch((e) => {
                const err = e.response?.status === 403 ? "unauthorized" : "failed";
                navigate(`/admin/login?error=${err}`, { replace: true });
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex min-h-screen items-center justify-center bg-navy" data-testid="auth-callback-loading">
            <div className="flex items-center gap-3 text-white">
                <Loader2 className="h-5 w-5 animate-spin text-gold" />
                <span className="font-heading text-sm font-semibold tracking-wide">Signing you in…</span>
            </div>
        </div>
    );
}
