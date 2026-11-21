import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSite } from "@/context/SiteContext";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Icon3D } from "@/lib/icons3d";

function ProfileCard({ member, featured = false, delay = 0 }) {
    const [open, setOpen] = useState(false);
    return (
        <Reveal delay={delay} className="h-full">
            <div
                className={`flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${
                    featured ? "border-gold/60" : "border-border"
                }`}
                data-testid={`leader-card-${member.id}`}
            >
                <div className="relative aspect-[5/4] w-full overflow-hidden bg-navy">
                    <img
                        src={member.photo || `/assets/gen/monogram_${member.monogram}.webp`}
                        alt={`${member.name} — ${member.designation}`}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                    />
                </div>
                <div className="flex flex-grow flex-col p-7">
                    <h3 className="font-heading text-xl font-bold text-navy" data-testid={`leader-name-${member.id}`}>{member.name}</h3>
                    <p className="mt-1 font-heading text-xs font-bold uppercase tracking-[0.18em] text-gold-dark">{member.designation}</p>
                    <p className="mt-3 flex-grow text-sm leading-relaxed text-ink-soft">{member.short}</p>
                    <button
                        onClick={() => setOpen(!open)}
                        data-testid={`leader-read-profile-${member.id}`}
                        aria-expanded={open}
                        className="group mt-5 inline-flex items-center gap-2 self-start font-heading text-sm font-bold text-navy transition-colors duration-300 hover:text-gold-dark"
                    >
                        {open ? <Minus className="h-4 w-4 text-gold" /> : <Plus className="h-4 w-4 text-gold" />}
                        {open ? "Close Profile" : "Read Profile"}
                    </button>
                    <AnimatePresence initial={false}>
                        {open && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="mt-5 space-y-3 border-t border-border pt-5 text-sm leading-relaxed text-ink-soft" data-testid={`leader-bio-${member.id}`}>
                                    {member.bio.split("\n\n").map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </Reveal>
    );
}

export default function Leadership() {
    const { content } = useSite();
    const l = content.leadership;
    const [chairman, ...directors] = l.team;

    return (
        <div data-testid="leadership-page">
            <PageHero caption={l.heroCaption} title={l.heroTitle} subtitle={l.heroSub} />

            {/* PHILOSOPHY */}
            <section className="py-16 md:py-24" data-testid="leadership-philosophy">
                <div className="mx-auto max-w-3xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">01 — Leadership Philosophy</p></Reveal>
                    <Reveal delay={0.1}>
                        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft md:text-lg">
                            {l.philosophy.split("\n\n").map((para, i) => (
                                <p key={i}>{para}</p>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* TEAM */}
            <section className="bg-mist py-16 md:py-28" data-testid="leadership-team">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">02 — Leadership Team</p></Reveal>
                    <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="sm:col-span-2 lg:col-span-1 lg:col-start-2">
                            <ProfileCard member={chairman} featured delay={0.05} />
                        </div>
                    </div>
                    <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {directors.map((m, i) => (
                            <ProfileCard key={m.id} member={m} delay={0.1 + 0.05 * i} />
                        ))}
                    </div>
                </div>
            </section>

            {/* PRINCIPLES */}
            <section className="py-16 md:py-28" data-testid="leadership-principles">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">03 — Our Leadership Principles</p></Reveal>
                    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {l.principles.map((p, i) => (
                            <Reveal key={p.title} delay={0.05 * i} className="h-full">
                                <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" data-testid={`principle-${p.title.toLowerCase().replace(/\s+/g, "-")}`}>
                                    <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                                    <div className="h-14 w-14 overflow-hidden rounded-lg bg-navy">
                                        <Icon3D name={p.icon} className="h-full w-full object-cover" />
                                    </div>
                                    <h3 className="mt-5 font-heading text-lg font-bold text-navy">{p.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* GOVERNANCE */}
            <section className="grain relative bg-navy py-16 md:py-24" data-testid="leadership-governance">
                <div className="relative z-10 mx-auto max-w-3xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">04 — Governance</p></Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">{l.governance}</p>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <Link to="/compliance" data-testid="leadership-compliance-link" className="group mt-8 inline-flex items-center gap-2 font-heading text-sm font-bold text-gold hover:text-gold-light">
                            View Compliance &amp; Governance
                            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
