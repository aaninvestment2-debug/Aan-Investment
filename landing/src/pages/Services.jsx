import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useHashScroll } from "@/lib/useHashScroll";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Icon3D } from "@/lib/icons3d";

export default function Services() {
    const { content } = useSite();
    useHashScroll();

    return (
        <div data-testid="services-page">
            <PageHero
                caption="Our Services"
                title="Lending capabilities"
                subtitle="Secured lending and structured credit for businesses, corporates and real estate developers."
            />

            <section className="py-16 md:py-28" data-testid="services-list">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    {content.services.map((s, i) => (
                        <Reveal key={s.slug}>
                            <div
                                id={s.slug}
                                className="group grid scroll-mt-28 grid-cols-1 items-center gap-8 border-t border-border py-12 last:border-b md:grid-cols-12 md:py-16"
                                data-testid={`services-row-${s.slug}`}
                            >
                                <div className="md:col-span-2">
                                    <div className="h-20 w-20 overflow-hidden rounded-xl bg-navy shadow-md transition-transform duration-300 group-hover:scale-105">
                                        <Icon3D name={s.icon} className="h-full w-full object-cover" />
                                    </div>
                                </div>
                                <div className="md:col-span-3">
                                    <span className="font-heading text-sm font-bold text-gold-dark">0{i + 1}</span>
                                    <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-navy">{s.title}</h2>
                                </div>
                                <p className="text-base leading-relaxed text-ink-soft md:col-span-4">{s.short}</p>
                                <div className="flex flex-col gap-3 md:col-span-3 md:items-end">
                                    {s.link.startsWith("/services") ? (
                                        <span className="text-sm text-ink-soft">Part of our corporate lending practice</span>
                                    ) : (
                                        <Link to={s.link} data-testid={`services-overview-${s.slug}`} className="font-heading text-sm font-semibold text-navy/60 transition-colors duration-300 hover:text-gold-dark">
                                            Capability overview
                                        </Link>
                                    )}
                                    <Link to="/contact" data-testid={`services-discuss-${s.slug}`} className="group/btn inline-flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-heading text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-light">
                                        Discuss with our Credit Team
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </section>

            <section className="grain relative bg-navy py-16 md:py-24" data-testid="services-cta">
                <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-12">
                    <Reveal>
                        <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                            Every transaction begins with a confidential discussion.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <Link to="/contact" data-testid="services-cta-btn" className="group mt-8 inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 font-heading text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light">
                            Discuss Your Requirement
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
