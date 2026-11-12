import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useSite } from "@/context/SiteContext";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";

export default function Contact() {
    const { content } = useSite();
    const c = content.contact;

    const details = [
        { icon: MapPin, label: "Registered Office", value: c.address, testid: "contact-address" },
        { icon: Phone, label: "Phone", value: c.phone, testid: "contact-phone", href: `tel:${c.phone.replace(/\s/g, "")}` },
        { icon: Mail, label: "Email", value: c.email, testid: "contact-email", href: `mailto:${c.email}` },
        { icon: Clock, label: "Business Hours", value: c.hours, testid: "contact-hours" },
    ];

    return (
        <div data-testid="contact-page">
            <PageHero caption={c.heroCaption} title={c.heroTitle} subtitle={c.heroSub} />

            <section className="py-20 md:py-32" data-testid="contact-main">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 md:px-12 lg:grid-cols-12 lg:gap-20">
                    <div className="lg:col-span-7">
                        <Reveal><p className="eyebrow">Write to Us</p></Reveal>
                        <Reveal delay={0.1}>
                            <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-navy md:text-4xl">
                                Discuss your funding requirement
                            </h2>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="mt-10 rounded-lg border border-border bg-white p-8 shadow-sm md:p-10">
                                <InquiryForm />
                            </div>
                        </Reveal>
                    </div>
                    <div className="lg:col-span-5">
                        <Reveal><p className="eyebrow">Reach Us Directly</p></Reveal>
                        <div className="mt-8 space-y-4">
                            {details.map((d, i) => (
                                <Reveal key={d.label} delay={0.08 * i}>
                                    <div className="flex gap-5 rounded-lg border border-border bg-white p-6 shadow-sm" data-testid={d.testid}>
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy">
                                            <d.icon className="h-5 w-5 text-gold" />
                                        </span>
                                        <div>
                                            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">{d.label}</p>
                                            {d.href ? (
                                                <a href={d.href} className="mt-1.5 block whitespace-pre-line text-base font-medium text-navy hover:text-gold-dark">
                                                    {d.value}
                                                </a>
                                            ) : (
                                                <p className="mt-1.5 whitespace-pre-line text-base font-medium text-navy">{d.value}</p>
                                            )}
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-20 md:pb-32" data-testid="contact-map">
                <div className="mx-auto max-w-7xl px-6 md:px-12">
                    <Reveal>
                        <div className="overflow-hidden rounded-lg border border-border shadow-sm">
                            <iframe
                                title="Aan Finance office location — Hyderabad"
                                src={c.mapUrl}
                                className="h-[420px] w-full grayscale contrast-[1.05]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                allowFullScreen
                            />
                        </div>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
