import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Linkedin, Twitter } from "lucide-react";
import { useSite } from "@/context/SiteContext";

export default function Footer() {
    const { content } = useSite();
    const { footer, contact } = content;

    return (
        <footer data-testid="site-footer" className="grain bg-navy-deep text-white">
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <img src="/assets/aan_symbol.png" alt="Aan Finance logo" className="h-10 w-auto" />
                            <span className="font-heading text-lg font-extrabold tracking-[0.14em]">AAN FINANCE</span>
                        </div>
                        <p className="mt-5 text-sm leading-relaxed text-white/60">{footer.about}</p>
                        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-gold/80">{footer.rbiNote}</p>
                    </div>
                    <div>
                        <h4 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/90">Quick Links</h4>
                        <ul className="mt-5 space-y-3 text-sm">
                            {[
                                ["Leadership", "/leadership"],
                                ["Our Services", "/services"],
                                ["Compliance", "/compliance"],
                                ["Contact", "/contact"],
                            ].map(([label, to]) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        data-testid={`footer-link-${label.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-white/60 transition-colors duration-200 hover:text-gold"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/90">Services</h4>
                        <ul className="mt-5 space-y-3 text-sm">
                            {[
                                ["Loan Against Property", "/loan-against-property"],
                                ["Business Loans", "/business-loans"],
                                ["Corporate Lending", "/corporate-finance"],
                                ["Structured Lending", "/services#structured-lending"],
                            ].map(([label, to]) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        data-testid={`footer-service-${label.toLowerCase().replace(/\s+/g, "-")}`}
                                        className="text-white/60 transition-colors duration-200 hover:text-gold"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-white/90">Contact</h4>
                        <ul className="mt-5 space-y-4 text-sm text-white/60">
                            <li className="flex gap-3">
                                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                <span className="whitespace-pre-line">{contact.address}</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} data-testid="footer-phone" className="hover:text-gold">
                                    {contact.phone}
                                </a>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                                <a href={`mailto:${contact.email}`} data-testid="footer-email" className="hover:text-gold">
                                    {contact.email}
                                </a>
                            </li>
                        </ul>
                        <div className="mt-6 flex gap-3">
                            <a href="#" aria-label="LinkedIn" data-testid="footer-social-linkedin" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-200 hover:border-gold hover:text-gold">
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a href="#" aria-label="Twitter" data-testid="footer-social-twitter" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors duration-200 hover:border-gold hover:text-gold">
                                <Twitter className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
                    <p>© {new Date().getFullYear()} Aan Finance &amp; Investment Private Limited. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <Link to="/compliance#privacy" data-testid="footer-privacy-link" className="hover:text-gold">Privacy Policy</Link>
                        <Link to="/compliance#terms" data-testid="footer-terms-link" className="hover:text-gold">Terms of Use</Link>
                        <Link to="/admin/login" data-testid="footer-admin-link" className="hover:text-gold">Admin</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
