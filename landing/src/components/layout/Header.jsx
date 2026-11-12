import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useSite } from "@/context/SiteContext";

const SERVICE_LINKS = [
    { to: "/services", label: "All Services" },
    { to: "/loan-against-property", label: "Loan Against Property" },
    { to: "/business-loans", label: "Business Loans" },
    { to: "/corporate-finance", label: "Corporate Lending" },
];

const NAV = [
    { to: "/leadership", label: "Leadership" },
    { to: "/services", label: "Services", dropdown: true },
    { to: "/compliance", label: "Compliance" },
    { to: "/contact", label: "Contact" },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [dropOpen, setDropOpen] = useState(false);
    const location = useLocation();
    const { content } = useSite();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 32);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
        setDropOpen(false);
    }, [location.pathname]);

    const dark = !scrolled && !open;

    return (
        <header
            data-testid="site-header"
            className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
                dark ? "bg-transparent text-white" : "bg-white/95 text-navy shadow-sm backdrop-blur-md"
            }`}
        >
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
                <Link to="/" data-testid="header-logo-link" className="flex items-center gap-3" aria-label="Aan Finance home">
                    <img src="/assets/aan_symbol.png" alt="Aan Finance logo" className="h-10 w-auto" />
                    <span className="leading-tight">
                        <span className="block font-heading text-base font-extrabold tracking-[0.14em]">AAN FINANCE</span>
                        <span className={`block text-[10px] uppercase tracking-[0.22em] ${dark ? "text-white/60" : "text-ink-soft"}`}>
                            RBI Registered NBFC
                        </span>
                    </span>
                </Link>

                <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
                    {NAV.map((item) =>
                        item.dropdown ? (
                            <div
                                key={item.to}
                                className="relative"
                                onMouseEnter={() => setDropOpen(true)}
                                onMouseLeave={() => setDropOpen(false)}
                            >
                                <NavLink
                                    to={item.to}
                                    data-testid="nav-services"
                                    className={({ isActive }) =>
                                        `flex items-center gap-1 font-heading text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-gold ${
                                            isActive ? "text-gold" : ""
                                        }`
                                    }
                                >
                                    {item.label}
                                    <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${dropOpen ? "rotate-180" : ""}`} />
                                </NavLink>
                                <AnimatePresence>
                                    {dropOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 8 }}
                                            transition={{ duration: 0.25 }}
                                            className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-4"
                                        >
                                            <div className="rounded-lg border border-border bg-white p-2 shadow-xl">
                                                {SERVICE_LINKS.map((s) => (
                                                    <Link
                                                        key={s.to}
                                                        to={s.to}
                                                        data-testid={`nav-dropdown-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                                                        className="block rounded-md px-4 py-2.5 text-sm font-medium text-navy transition-colors duration-200 hover:bg-mist hover:text-gold-dark"
                                                    >
                                                        {s.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                                className={({ isActive }) =>
                                    `font-heading text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-gold ${
                                        isActive ? "text-gold" : ""
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ),
                    )}
                    <a
                        href="/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid="header-employee-login"
                        className={`flex items-center gap-1.5 font-heading text-sm font-semibold tracking-wide transition-colors duration-300 hover:text-gold ${
                            dark ? "text-white/70" : "text-navy/70"
                        }`}
                    >
                        <Lock className="h-3.5 w-3.5" />
                        Employee Login
                    </a>
                    <Link
                        to="/contact"
                        data-testid="header-enquire-btn"
                        className={`group flex items-center gap-2 rounded-lg px-5 py-2.5 font-heading text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 ${
                            dark ? "bg-gold text-navy hover:bg-gold-light" : "bg-navy text-white hover:bg-navy-light"
                        }`}
                    >
                        Enquire Now
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                </nav>

                <button
                    data-testid="mobile-menu-btn"
                    onClick={() => setOpen(!open)}
                    className="p-2 lg:hidden"
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-border bg-white lg:hidden"
                        aria-label="Mobile"
                    >
                        <div className="space-y-1 px-6 py-6">
                            {[{ to: "/", label: "Home" }, ...NAV].map((item) => (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="block rounded-md px-3 py-3 font-heading text-base font-semibold text-navy hover:bg-mist"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            {SERVICE_LINKS.slice(1).map((s) => (
                                <Link
                                    key={s.to}
                                    to={s.to}
                                    data-testid={`mobile-nav-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="block rounded-md px-3 py-2.5 pl-8 text-sm text-ink-soft hover:bg-mist"
                                >
                                    {s.label}
                                </Link>
                            ))}
                            <a
                                href="/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="mobile-employee-login"
                                className="flex w-full items-center gap-2 rounded-md px-3 py-3 text-left font-heading text-base font-semibold text-navy hover:bg-mist"
                            >
                                <Lock className="h-4 w-4 text-gold-dark" />
                                Employee Login
                            </a>
                            <Link
                                to="/contact"
                                data-testid="mobile-enquire-btn"
                                className="mt-4 block rounded-lg bg-navy px-5 py-3.5 text-center font-heading text-sm font-bold text-white"
                            >
                                Enquire Now
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
}
