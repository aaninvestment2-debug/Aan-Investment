import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { Reveal, MaskedLine, FadeIn } from "@/components/motion/Reveal";
import { Icon3D } from "@/lib/icons3d";

export default function Home() {
    const { content } = useSite();
    const c = content.home;
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const gfxY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const contentFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);

    return (
        <div data-testid="home-page">
            {/* HERO */}
            <section ref={heroRef} className="grain relative flex min-h-[88vh] items-center overflow-hidden bg-navy md:min-h-screen" data-testid="home-hero">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,39,0.10),transparent_55%)]" />
                <motion.div style={{ y: gfxY }} className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-center lg:flex" aria-hidden="true">
                    <motion.img
                        src="/assets/gen/hero_gold_3d.webp"
                        alt=""
                        initial={{ opacity: 0, scale: 0.92, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="h-auto w-full object-contain"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-navy" />
                </motion.div>
                <motion.div style={{ opacity: contentFade, y: contentY }} className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 md:px-12">
                    <FadeIn delay={0.2}>
                        <p className="eyebrow" data-testid="hero-eyebrow">RBI Registered NBFC · Hyderabad</p>
                    </FadeIn>
                    <h1 className="mt-6 font-heading text-4xl font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                        <MaskedLine delay={0.35}>{c.heroLine1}</MaskedLine>
                        <MaskedLine delay={0.5} className="text-gold">{c.heroLine2}</MaskedLine>
                    </h1>
                    <FadeIn delay={0.9}>
                        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 md:text-lg" data-testid="hero-subheadline">{c.heroSub}</p>
                    </FadeIn>
                    <FadeIn delay={1.1}>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                to="/contact"
                                data-testid="hero-discuss-btn"
                                className="group flex items-center gap-2 rounded-lg bg-gold px-8 py-4 font-heading text-sm font-bold text-navy shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                            >
                                Discuss Your Requirement
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                            <Link
                                to="/compliance"
                                data-testid="hero-corporate-info-btn"
                                className="rounded-lg border border-white/30 px-8 py-4 font-heading text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                            >
                                Corporate Information
                            </Link>
                        </div>
                    </FadeIn>
                </motion.div>
                <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
                    <div className="h-14 w-px overflow-hidden bg-white/20">
                        <div className="h-full w-full animate-scroll-cue bg-gold" />
                    </div>
                </div>
            </section>

            {/* INSTITUTION AT A GLANCE */}
            <section className="border-b border-border bg-white" data-testid="home-glance">
                <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
                    <Reveal>
                        <p className="eyebrow" data-testid="glance-caption">Institution at a Glance</p>
                    </Reveal>
                    <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 md:grid-cols-3 lg:grid-cols-6">
                        {c.glance.map((g, i) => (
                            <Reveal key={g} delay={0.05 * i}>
                                <div className="flex items-start gap-3" data-testid={`glance-item-${i}`}>
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden="true" />
                                    <p className="font-heading text-sm font-semibold leading-snug text-navy">{g}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section className="py-16 md:py-28" data-testid="home-about">
                <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 md:px-12 lg:grid-cols-12 lg:gap-20">
                    <div className="hidden lg:col-span-5 lg:block">
                        <Reveal>
                            <div className="relative">
                                <div className="absolute -left-4 -top-4 h-full w-full border border-gold/50" aria-hidden="true" />
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-navy">
                                    <img src="/assets/gen/graphic_about.webp" alt="Abstract gold geometric composition" className="h-full w-full object-cover" loading="lazy" />
                                </div>
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-7">
                        <Reveal>
                            <p className="eyebrow">{c.aboutCaption}</p>
                        </Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="mt-5 font-heading text-3xl font-bold leading-snug tracking-tight text-navy md:text-4xl">
                                {c.aboutHeading}
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink-soft" data-testid="home-about-text">
                                {c.aboutText.split("\n\n").map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </Reveal>
                        <Reveal delay={0.25}>
                            <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2" data-testid="home-highlights">
                                {c.highlights.map((h) => (
                                    <li key={h} className="flex items-center gap-3 text-sm font-medium text-navy">
                                        <span className="h-1.5 w-1.5 rotate-45 bg-gold" aria-hidden="true" />
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <Link to="/leadership" data-testid="about-leadership-link" className="group mt-8 inline-flex items-center gap-2 font-heading text-sm font-bold text-navy transition-colors duration-300 hover:text-gold-dark">
                                Our Leadership
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-mist py-16 md:py-28" data-testid="home-services">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <Reveal><p className="eyebrow">02 — What We Do</p></Reveal>
                            <Reveal delay={0.1}>
                                <h2 className="mt-5 max-w-xl font-heading text-3xl font-bold tracking-tight text-navy md:text-4xl">
                                    Lending capabilities
                                </h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.2}>
                            <Link to="/services" data-testid="services-view-all-link" className="group inline-flex items-center gap-2 font-heading text-sm font-bold text-navy hover:text-gold-dark">
                                View Capabilities
                                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Reveal>
                    </div>
                    <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {content.services.map((s, i) => (
                            <Reveal key={s.slug} delay={0.08 * i} className="h-full">
                                <div
                                    data-testid={`service-card-${s.slug}`}
                                    className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                                    <div className="flex items-start justify-between">
                                        <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-navy transition-transform duration-300 group-hover:scale-110">
                                            <Icon3D name={s.icon} className="h-full w-full object-cover" />
                                        </div>
                                        <span className="font-heading text-sm font-bold text-navy/20">0{i + 1}</span>
                                    </div>
                                    <Link to={s.link} data-testid={`service-link-${s.slug}`} className="mt-6 font-heading text-lg font-bold text-navy transition-colors duration-300 hover:text-gold-dark">
                                        {s.title}
                                    </Link>
                                    <p className="mt-3 flex-grow text-sm leading-relaxed text-ink-soft">{s.short}</p>
                                    <Link to="/contact" data-testid={`service-discuss-${s.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-navy/60 transition-colors duration-300 hover:text-gold-dark">
                                        Discuss with our Credit Team <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO WE FINANCE */}
            <section className="py-16 md:py-28" data-testid="home-who-finance">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">03 — Who We Finance</p></Reveal>
                    <Reveal delay={0.1}>
                        <h2 className="mt-5 max-w-xl font-heading text-3xl font-bold tracking-tight text-navy md:text-4xl">
                            A select clientele, by design
                        </h2>
                    </Reveal>
                    <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
                        {c.whoFinance.map((w, i) => (
                            <Reveal key={w.title} delay={0.06 * i} className="h-full">
                                <div className="flex h-full flex-col bg-white p-8" data-testid={`who-finance-${i}`}>
                                    <span className="font-heading text-sm font-bold text-gold-dark">0{i + 1}</span>
                                    <h3 className="mt-4 font-heading text-lg font-bold text-navy">{w.title}</h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{w.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* LENDING PHILOSOPHY */}
            <section className="bg-mist py-16 md:py-28" data-testid="home-philosophy">
                <div className="mx-auto max-w-5xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">04 — Our Lending Philosophy</p></Reveal>
                    <div className="mt-10">
                        {c.philosophy.map((p, i) => (
                            <Reveal key={p} delay={0.05 * i}>
                                <div className="flex items-baseline gap-6 border-t border-border py-5 last:border-b md:gap-10" data-testid={`philosophy-${i}`}>
                                    <span className="font-heading text-sm font-bold text-gold-dark">0{i + 1}</span>
                                    <p className="font-heading text-lg font-semibold leading-snug text-navy md:text-xl">{p}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHY BUSINESSES WORK WITH AAN FINANCE */}
            <section className="grain relative bg-navy py-16 md:py-28" data-testid="home-why-choose">
                <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">05 — Why Businesses Work With Aan Finance</p></Reveal>
                    <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                        {content.whyChoose.map((w, i) => (
                            <Reveal key={w.title} delay={0.05 * i} className="h-full">
                                <div className="group flex h-full flex-col bg-navy p-8 transition-colors duration-300 hover:bg-navy-light" data-testid={`why-item-${w.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="h-14 w-14 overflow-hidden rounded-lg">
                                            <Icon3D name={w.icon} className="h-full w-full object-cover" />
                                        </div>
                                        <span className="font-heading text-xs font-bold text-white/20">0{i + 1}</span>
                                    </div>
                                    <h3 className="mt-6 font-heading text-lg font-bold text-white">{w.title}</h3>
                                    <p className="mt-2.5 text-sm leading-relaxed text-white/55">{w.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="grain relative bg-navy py-16 md:py-24" data-testid="home-cta">
                <div className="relative z-10 mx-auto max-w-4xl px-6 text-center md:px-12">
                    <Reveal>
                        <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{c.ctaTitle}</h2>
                    </Reveal>
                    <Reveal delay={0.15}>
                        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/65">{c.ctaText}</p>
                    </Reveal>
                    <Reveal delay={0.3}>
                        <Link
                            to="/contact"
                            data-testid="cta-contact-btn"
                            className="group mt-10 inline-flex items-center gap-2 rounded-lg bg-gold px-10 py-4 font-heading text-sm font-bold text-navy shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light"
                        >
                            Discuss Your Requirement
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
