export const Marquee = ({ items }) => (
    <div className="overflow-hidden border-y border-navy/10 bg-mist py-6" aria-hidden="true">
        <div className="flex w-max animate-marquee whitespace-nowrap">
            {[0, 1].map((copy) => (
                <div key={copy} className="flex shrink-0 items-center">
                    {items.map((item, i) => (
                        <span key={i} className="flex items-center">
                            <span className="mx-10 font-heading text-base md:text-lg font-semibold uppercase tracking-[0.3em] text-navy/30">
                                {item}
                            </span>
                            <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
);
