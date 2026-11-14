import { useState } from "react";
import { Navigate, Link, useLocation } from "react-router-dom";
import {
    Inbox, Home as HomeIcon, Users, Layers, ShieldCheck, Landmark,
    Globe, FileCheck, Download, LogOut, Loader2, ExternalLink,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
    HomeEditor, LeadershipEditor, ServicesEditor, WhyEditor, LoanPagesEditor,
    ContactSeoEditor, ComplianceEditor, DownloadsManager, InquiriesViewer,
} from "@/pages/admin/editors";

const TABS = [
    { id: "inquiries", label: "Inquiries", icon: Inbox, component: InquiriesViewer },
    { id: "home", label: "Homepage", icon: HomeIcon, component: HomeEditor },
    { id: "leadership", label: "Leadership", icon: Users, component: LeadershipEditor },
    { id: "services", label: "Services", icon: Layers, component: ServicesEditor },
    { id: "why", label: "Why Aan Finance", icon: ShieldCheck, component: WhyEditor },
    { id: "loans", label: "Loan Pages", icon: Landmark, component: LoanPagesEditor },
    { id: "contact", label: "Contact & SEO", icon: Globe, component: ContactSeoEditor },
    { id: "compliance", label: "Compliance", icon: FileCheck, component: ComplianceEditor },
    { id: "downloads", label: "Downloads", icon: Download, component: DownloadsManager },
];

export default function AdminDashboard() {
    const { user, loading, logout } = useAuth();
    const location = useLocation();
    const [tab, setTab] = useState("inquiries");
    const effectiveUser = user || location.state?.user;

    if (loading && !effectiveUser) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-mist" data-testid="admin-loading">
                <Loader2 className="h-6 w-6 animate-spin text-navy" />
            </div>
        );
    }
    if (!effectiveUser) return <Navigate to="/admin/login" replace />;

    const Active = TABS.find((t) => t.id === tab).component;

    return (
        <div className="min-h-screen bg-mist" data-testid="admin-dashboard">
            <header className="sticky top-0 z-40 border-b border-border bg-white">
                <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-3">
                        <img src="/assets/aan_symbol.png" alt="Aan Finance logo" className="h-9 w-auto" />
                        <div>
                            <p className="font-heading text-sm font-extrabold tracking-[0.14em] text-navy">AAN FINANCE</p>
                            <p className="text-xs text-ink-soft">{effectiveUser.email}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link to="/" data-testid="admin-view-site" className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-navy hover:bg-mist">
                            <ExternalLink className="h-4 w-4" /> View Site
                        </Link>
                        <button onClick={logout} data-testid="admin-logout-btn" className="flex items-center gap-1.5 rounded-lg bg-navy px-4 py-2 text-sm font-semibold text-white hover:bg-navy-light">
                            <LogOut className="h-4 w-4" /> Logout
                        </button>
                    </div>
                </div>
            </header>
            <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-4 py-8 md:px-8 lg:flex-row">
                <nav className="flex gap-2 overflow-x-auto pb-2 lg:w-60 lg:shrink-0 lg:flex-col lg:overflow-visible lg:pb-0" aria-label="Admin sections">
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            data-testid={`admin-tab-${t.id}`}
                            className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 font-heading text-sm font-semibold transition-colors duration-200 ${
                                tab === t.id ? "bg-navy text-white" : "bg-white text-navy hover:bg-navy/5"
                            }`}
                        >
                            <t.icon className={`h-4 w-4 ${tab === t.id ? "text-gold" : "text-navy/50"}`} />
                            {t.label}
                        </button>
                    ))}
                </nav>
                <main className="min-w-0 flex-1 rounded-lg border border-border bg-white p-6 md:p-8" data-testid="admin-content">
                    <Active />
                </main>
            </div>
        </div>
    );
}
