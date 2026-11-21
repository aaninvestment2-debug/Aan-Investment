import { Navigate, useSearchParams, Link } from "react-router-dom";
import { LogIn, ArrowLeft, ShieldAlert } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
    const { user, loading } = useAuth();
    const [params] = useSearchParams();
    const error = params.get("error");

    if (!loading && user) return <Navigate to="/admin" replace />;

    const login = () => {
        // REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
        const redirectUrl = window.location.origin + "/admin";
        window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
    };

    return (
        <div className="grain flex min-h-screen items-center justify-center bg-navy px-6" data-testid="admin-login-page">
            <div className="relative z-10 w-full max-w-md">
                <div className="rounded-lg border border-white/10 bg-white p-10 shadow-2xl">
                    <div className="flex items-center gap-3">
                        <img src="/assets/aan_symbol.png" alt="Aan Finance logo" className="h-11 w-auto" />
                        <div>
                            <p className="font-heading text-lg font-extrabold tracking-[0.14em] text-navy">AAN FINANCE</p>
                            <p className="text-xs uppercase tracking-[0.2em] text-ink-soft">Admin Console</p>
                        </div>
                    </div>
                    {error && (
                        <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4" data-testid="admin-login-error">
                            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-700" />
                            <p className="text-sm text-red-800">
                                {error === "unauthorized"
                                    ? "This Google account is not authorized for admin access. Please use an authorized account."
                                    : "Sign-in failed. Please try again."}
                            </p>
                        </div>
                    )}
                    <p className="mt-6 text-sm leading-relaxed text-ink-soft">
                        Sign in with your authorized Google account to manage website content, enquiries, FAQs and documents.
                    </p>
                    <button
                        onClick={login}
                        data-testid="admin-google-login-btn"
                        className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg bg-navy px-6 py-4 font-heading text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-light"
                    >
                        <LogIn className="h-4 w-4 text-gold" />
                        Sign in with Google
                    </button>
                </div>
                <Link to="/" data-testid="admin-back-to-site" className="mt-6 flex items-center justify-center gap-2 text-sm text-white/60 transition-colors hover:text-gold">
                    <ArrowLeft className="h-4 w-4" /> Back to website
                </Link>
            </div>
        </div>
    );
}
