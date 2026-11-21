import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export default function ServiceDetail({ pageKey }) {
    const { content } = useSite();
    const p = content.loanPages[pageKey];

    return (
        <div data-testid={`${pageKey}-page`}>
            <PageHero caption={p.heroCaption} title={p.heroTitle} subtitle={p.heroSub} />

            <section className="py-16 md:py-28">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:px-12 lg:grid-cols-12 lg:gap-20">
                    <div className="lg:col-span-7">
                        <Reveal><p className="eyebrow">Capability</p></Reveal>
                        <Reveal delay={0.1}>
                            <p className="mt-6 text-base leading-relaxed text-ink-soft md:text-lg" data-testid={`${pageKey}-intro`}>
                                {p.introText}
                            </p>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-5">
                        <Reveal><p className="eyebrow">Key Features</p></Reveal>
                        <ul className="mt-6 space-y-3" data-testid={`${pageKey}-points`}>
                            {p.points.map((point, i) => (
                                <Reveal key={point} delay={0.05 * i}>
                                    <li className="flex items-start gap-4 rounded-lg border border-border bg-white p-4 shadow-sm">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                                        <span className="text-sm leading-relaxed text-navy md:text-base">{point}</span>
                                    </li>
                                </Reveal>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section className="grain relative bg-navy py-16 md:py-24" data-testid={`${pageKey}-cta`}>
                <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 md:flex-row md:items-center md:px-12">
                    <Reveal>
                        <h2 className="max-w-xl font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
                            Every transaction begins with a confidential discussion.
                        </h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <Link to="/contact" data-testid={`${pageKey}-discuss-btn`} className="group inline-flex shrink-0 items-center gap-2 rounded-lg bg-gold px-8 py-4 font-heading text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light">
                            Discuss with our Credit Team
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
