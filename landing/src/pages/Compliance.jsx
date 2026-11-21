import { useEffect, useState } from "react";
import { Building, Hash, MapPin, UserCheck, Download } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import { useHashScroll } from "@/lib/useHashScroll";
import api from "@/lib/api";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export default function Compliance() {
    const { content } = useSite();
    const comp = content.compliance;
    const [docs, setDocs] = useState([]);
    useHashScroll();

    useEffect(() => {
        api.get("/downloads").then((r) => setDocs(r.data.filter((d) => d.category === "Policies"))).catch(() => {});
    }, []);

    const corporateInfo = [
        { icon: Hash, label: "Corporate Identity Number (CIN)", value: comp.cin, testid: "compliance-cin" },
        { icon: MapPin, label: "Registered Office", value: comp.registeredOffice, testid: "compliance-registered-office" },
        { icon: Building, label: "Corporate Office", value: comp.corporateOffice, testid: "compliance-corporate-office" },
        { icon: UserCheck, label: "Grievance Officer", value: comp.grievanceOfficer, testid: "compliance-grievance-officer" },
    ];

    return (
        <div data-testid="compliance-page">
            <PageHero caption={comp.heroCaption} title={comp.heroTitle} subtitle={comp.heroSub} />

            {/* CORPORATE INFORMATION */}
            <section className="border-b border-border py-16 md:py-20" data-testid="compliance-corporate-info">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <Reveal><p className="eyebrow">Corporate Information</p></Reveal>
                    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {corporateInfo.map((info, i) => (
                            <Reveal key={info.label} delay={0.05 * i}>
                                <div className="h-full rounded-lg border border-border bg-white p-6 shadow-sm" data-testid={info.testid}>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy">
                                        <info.icon className="h-5 w-5 text-gold" />
                                    </span>
                                    <p className="mt-4 font-heading text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">{info.label}</p>
                                    <p className="mt-2 whitespace-pre-line text-sm font-medium leading-relaxed text-navy">{info.value}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-28">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:px-12 lg:grid-cols-12">
                    <aside className="lg:col-span-4">
                        <div className="lg:sticky lg:top-28">
                            <Reveal><p className="eyebrow">Policies & Codes</p></Reveal>
                            <nav className="mt-6 space-y-1" aria-label="Compliance sections">
                                {comp.sections.map((s) => (
                                    <a
                                        key={s.id}
                                        href={`#${s.id}`}
                                        data-testid={`compliance-nav-${s.id}`}
                                        className="block rounded-md px-4 py-2.5 text-sm font-medium text-ink-soft transition-colors duration-200 hover:bg-mist hover:text-navy"
                                    >
                                        {s.title}
                                    </a>
                                ))}
                            </nav>
                            {docs.length > 0 && (
                                <div className="mt-10" data-testid="compliance-policy-docs">
                                    <Reveal><p className="eyebrow">Policy Documents</p></Reveal>
                                    <div className="mt-4 space-y-2">
                                        {docs.map((d) => (
                                            <a
                                                key={d.download_id}
                                                href={`${process.env.REACT_APP_BACKEND_URL}${d.file_url}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                data-testid={`compliance-doc-${d.download_id}`}
                                                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-white px-4 py-3 text-sm font-medium text-navy transition-colors duration-200 hover:border-gold"
                                            >
                                                {d.title}
                                                <Download className="h-4 w-4 shrink-0 text-gold-dark" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>
                    <div className="lg:col-span-8">
                        {comp.sections.map((s, i) => (
                            <Reveal key={s.id} delay={0.03 * i}>
                                <article id={s.id} className="scroll-mt-28 border-t border-border py-10 first:border-t-0 first:pt-0" data-testid={`compliance-section-${s.id}`}>
                                    <h2 className="font-heading text-2xl font-bold tracking-tight text-navy md:text-3xl">{s.title}</h2>
                                    <p className="mt-4 text-base leading-relaxed text-ink-soft">{s.body}</p>
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
