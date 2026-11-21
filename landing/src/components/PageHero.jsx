import { MaskedLine, Reveal } from "@/components/motion/Reveal";

export default function PageHero({ caption, title, subtitle }) {
    return (
        <section className="grain relative overflow-hidden bg-navy" data-testid="page-hero">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.12),transparent_55%)]" />
            <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full border border-gold/10" aria-hidden="true" />
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full border border-gold/15" aria-hidden="true" />
            <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-40 md:px-12 md:pb-28 md:pt-52">
                <Reveal y={14}>
                    <p className="eyebrow" data-testid="page-hero-caption">{caption}</p>
                </Reveal>
                <h1 className="mt-5 max-w-4xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    <MaskedLine delay={0.15}>{title}</MaskedLine>
                </h1>
                {subtitle && (
                    <Reveal delay={0.45} y={20}>
                        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg" data-testid="page-hero-subtitle">
                            {subtitle}
                        </p>
                    </Reveal>
                )}
                <Reveal delay={0.6} y={0}>
                    <div className="gold-rule mt-10" />
                </Reveal>
            </div>
        </section>
    );
}
