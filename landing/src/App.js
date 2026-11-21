import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { SiteProvider } from "@/context/SiteContext";
import { AuthProvider } from "@/context/AuthContext";
import { setLenis, getLenis } from "@/lib/lenisStore";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Leadership from "@/pages/Leadership";
import Services from "@/pages/Services";
import LoanAgainstProperty from "@/pages/LoanAgainstProperty";
import BusinessLoans from "@/pages/BusinessLoans";
import CorporateFinance from "@/pages/CorporateFinance";
import Contact from "@/pages/Contact";
import Compliance from "@/pages/Compliance";
import AuthCallback from "@/pages/admin/AuthCallback";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";

function ScrollManager() {
    const { pathname } = useLocation();
    useEffect(() => {
        const lenis = getLenis();
        if (lenis) lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function AppRouter() {
    const location = useLocation();
    if (location.hash?.includes("session_id=")) return <AuthCallback />;
    const isAdmin = location.pathname.startsWith("/admin");
    return (
        <>
            <ScrollManager />
            {!isAdmin && <Header />}
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/leadership" element={<Leadership />} />
                    <Route path="/about" element={<Navigate to="/leadership" replace />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/loan-against-property" element={<LoanAgainstProperty />} />
                    <Route path="/business-loans" element={<BusinessLoans />} />
                    <Route path="/corporate-finance" element={<CorporateFinance />} />
                    <Route path="/why-choose-us" element={<Navigate to="/" replace />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/compliance" element={<Compliance />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/login" element={<AdminLogin />} />
                </Routes>
            </main>
            {!isAdmin && <Footer />}
        </>
    );
}

export default function App() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
        const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
        setLenis(lenis);
        let raf;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <BrowserRouter>
            <SiteProvider>
                <AuthProvider>
                    <AppRouter />
                    <Toaster position="top-center" richColors />
                </AuthProvider>
            </SiteProvider>
        </BrowserRouter>
    );
}
