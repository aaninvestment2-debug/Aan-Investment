import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2, Loader2, Plus, Download, Upload, MailOpen, Mail } from "lucide-react";
import api from "@/lib/api";
import { useSite } from "@/context/SiteContext";
import { TextInput, AreaInput, StringList, ObjectList, SaveBar } from "@/pages/admin/fields";

function useSection(key) {
    const { content, refresh } = useSite();
    const [data, setData] = useState(() => JSON.parse(JSON.stringify(content[key])));
    const [saving, setSaving] = useState(false);
    const save = async () => {
        setSaving(true);
        try {
            await api.put(`/content/${key}`, data);
            toast.success("Saved successfully");
            refresh();
        } catch (e) {
            toast.error(e.response?.status === 401 ? "Session expired. Please sign in again." : "Save failed");
        } finally {
            setSaving(false);
        }
    };
    return [data, setData, save, saving];
}

const setKey = (setData) => (k) => (v) => setData((d) => ({ ...d, [k]: v }));

export function HomeEditor() {
    const [d, setD, save, saving] = useSection("home");
    const set = setKey(setD);
    return (
        <div className="space-y-6" data-testid="editor-home">
            <h3 className="font-heading text-lg font-bold text-navy">Hero</h3>
            <div className="grid gap-5 md:grid-cols-2">
                <TextInput label="Headline Line 1" value={d.heroLine1} onChange={set("heroLine1")} testid="home-hero-line1" />
                <TextInput label="Headline Line 2 (gold)" value={d.heroLine2} onChange={set("heroLine2")} testid="home-hero-line2" />
            </div>
            <AreaInput label="Sub-headline" value={d.heroSub} onChange={set("heroSub")} testid="home-hero-sub" />
            <StringList label="Institution at a Glance" items={d.glance} onChange={set("glance")} testid="home-glance" />
            <h3 className="pt-4 font-heading text-lg font-bold text-navy">About</h3>
            <TextInput label="Heading" value={d.aboutHeading} onChange={set("aboutHeading")} testid="home-about-heading" />
            <AreaInput label="Text (blank line between paragraphs)" value={d.aboutText} onChange={set("aboutText")} rows={7} testid="home-about-text" />
            <h3 className="pt-4 font-heading text-lg font-bold text-navy">Lending Philosophy & Clientele</h3>
            <StringList label="Lending Philosophy Statements" items={d.philosophy} onChange={set("philosophy")} testid="home-philosophy" />
            <ObjectList label="Who We Finance" items={d.whoFinance} onChange={set("whoFinance")} testid="home-who-finance" fields={[{ key: "title", label: "Title" }, { key: "text", label: "Text", area: true }]} />
            <h3 className="pt-4 font-heading text-lg font-bold text-navy">Call to Action</h3>
            <div className="grid gap-5 md:grid-cols-2">
                <TextInput label="CTA Title" value={d.ctaTitle} onChange={set("ctaTitle")} testid="home-cta-title" />
                <TextInput label="CTA Text" value={d.ctaText} onChange={set("ctaText")} testid="home-cta-text" />
            </div>
            <SaveBar onSave={save} saving={saving} testid="home-save-btn" />
        </div>
    );
}

export function LeadershipEditor() {
    const [d, setD, save, saving] = useSection("leadership");
    const set = setKey(setD);
    return (
        <div className="space-y-6" data-testid="editor-leadership">
            <AreaInput label="Hero Subtitle" value={d.heroSub} onChange={set("heroSub")} rows={2} testid="leadership-hero-sub" />
            <AreaInput label="Leadership Philosophy (blank line between paragraphs)" value={d.philosophy} onChange={set("philosophy")} rows={6} testid="leadership-philosophy" />
            <ObjectList
                label="Leadership Team"
                items={d.team}
                onChange={set("team")}
                testid="leadership-team"
                fields={[
                    { key: "name", label: "Name" },
                    { key: "designation", label: "Designation" },
                    { key: "photo", label: "Photo URL (leave empty to use monogram)" },
                    { key: "monogram", label: "Monogram Letter (B / J / V / A)" },
                    { key: "short", label: "Short Profile" },
                    { key: "bio", label: "Full Biography (blank line between paragraphs)", area: true },
                ]}
            />
            <ObjectList label="Leadership Principles" items={d.principles} onChange={set("principles")} testid="leadership-principles" fields={[{ key: "title", label: "Title" }, { key: "text", label: "Text", area: true }, { key: "icon", label: "Icon (shield, eye, handshake, landmark, lock, filecheck)" }]} />
            <AreaInput label="Governance Statement" value={d.governance} onChange={set("governance")} rows={4} testid="leadership-governance" />
            <SaveBar onSave={save} saving={saving} testid="leadership-save-btn" />
        </div>
    );
}

export function ServicesEditor() {
    const [d, setD, save, saving] = useSection("services");
    return (
        <div className="space-y-6" data-testid="editor-services">
            <p className="rounded-lg border border-gold/30 bg-gold/5 p-4 text-sm text-ink-soft">
                Icon options: building, briefcase, layers, landmark, chart, compass. Keep slugs and links unchanged unless you know what you're doing.
            </p>
            <ObjectList
                label="Services"
                items={d}
                onChange={setD}
                testid="services-list"
                fields={[
                    { key: "title", label: "Title" },
                    { key: "short", label: "Short Description", area: true },
                    { key: "icon", label: "Icon" },
                    { key: "slug", label: "Slug" },
                    { key: "link", label: "Link" },
                ]}
            />
            <SaveBar onSave={save} saving={saving} testid="services-save-btn" />
        </div>
    );
}

export function WhyEditor() {
    const [d, setD, save, saving] = useSection("whyChoose");
    return (
        <div className="space-y-6" data-testid="editor-why">
            <p className="rounded-lg border border-gold/30 bg-gold/5 p-4 text-sm text-ink-soft">
                Icon options: shield, zap, eye, users, sliders, handshake, lock, filecheck.
            </p>
            <ObjectList label="Reasons" items={d} onChange={setD} testid="why-list" fields={[{ key: "title", label: "Title" }, { key: "text", label: "Text", area: true }, { key: "icon", label: "Icon" }]} />
            <SaveBar onSave={save} saving={saving} testid="why-save-btn" />
        </div>
    );
}

const LOAN_TABS = [
    ["lap", "Loan Against Property"],
    ["business", "Business Loans"],
    ["corporate", "Corporate Lending"],
];

export function LoanPagesEditor() {
    const [d, setD, save, saving] = useSection("loanPages");
    const [tab, setTab] = useState("lap");
    const p = d[tab];
    const setP = (k) => (v) => setD((prev) => ({ ...prev, [tab]: { ...prev[tab], [k]: v } }));
    return (
        <div className="space-y-6" data-testid="editor-loans">
            <div className="flex flex-wrap gap-2">
                {LOAN_TABS.map(([id, label]) => (
                    <button key={id} onClick={() => setTab(id)} data-testid={`loan-tab-${id}`} className={`rounded-lg px-4 py-2 font-heading text-sm font-semibold transition-colors ${tab === id ? "bg-navy text-white" : "bg-mist text-navy hover:bg-navy/10"}`}>
                        {label}
                    </button>
                ))}
            </div>
            <TextInput label="Hero Title" value={p.heroTitle} onChange={setP("heroTitle")} testid={`loan-${tab}-hero-title`} />
            <AreaInput label="Hero Subtitle" value={p.heroSub} onChange={setP("heroSub")} rows={2} testid={`loan-${tab}-hero-sub`} />
            <AreaInput label="Capability Statement" value={p.introText} onChange={setP("introText")} rows={4} testid={`loan-${tab}-intro-text`} />
            <StringList label="Key Features" items={p.points} onChange={setP("points")} testid={`loan-${tab}-points`} />
            <SaveBar onSave={save} saving={saving} testid="loans-save-btn" />
        </div>
    );
}

export function ContactSeoEditor() {
    const [c, setC, saveC, savingC] = useSection("contact");
    const [f, setF, saveF, savingF] = useSection("footer");
    const [s, setS, saveS, savingS] = useSection("seo");
    return (
        <div className="space-y-10" data-testid="editor-contact">
            <div className="space-y-6">
                <h3 className="font-heading text-lg font-bold text-navy">Contact Details</h3>
                <AreaInput label="Address" value={c.address} onChange={setKey(setC)("address")} rows={3} testid="contact-address" />
                <div className="grid gap-5 md:grid-cols-2">
                    <TextInput label="Phone" value={c.phone} onChange={setKey(setC)("phone")} testid="contact-phone" />
                    <TextInput label="Email" value={c.email} onChange={setKey(setC)("email")} testid="contact-email" />
                </div>
                <AreaInput label="Business Hours" value={c.hours} onChange={setKey(setC)("hours")} rows={2} testid="contact-hours" />
                <TextInput label="Google Maps Embed URL" value={c.mapUrl} onChange={setKey(setC)("mapUrl")} testid="contact-map-url" />
                <SaveBar onSave={saveC} saving={savingC} testid="contact-save-btn" />
            </div>
            <div className="space-y-6 border-t border-border pt-8">
                <h3 className="font-heading text-lg font-bold text-navy">Footer</h3>
                <AreaInput label="Footer About Text" value={f.about} onChange={setKey(setF)("about")} rows={3} testid="footer-about" />
                <TextInput label="RBI Note" value={f.rbiNote} onChange={setKey(setF)("rbiNote")} testid="footer-rbi-note" />
                <TextInput label="Employee Login URL (loan management system — leave empty until ready)" value={f.employeeLoginUrl || ""} onChange={setKey(setF)("employeeLoginUrl")} testid="footer-employee-login-url" />
                <SaveBar onSave={saveF} saving={savingF} testid="footer-save-btn" />
            </div>
            <div className="space-y-6 border-t border-border pt-8">
                <h3 className="font-heading text-lg font-bold text-navy">SEO Metadata</h3>
                <TextInput label="Meta Title" value={s.title} onChange={setKey(setS)("title")} testid="seo-title" />
                <AreaInput label="Meta Description" value={s.description} onChange={setKey(setS)("description")} rows={3} testid="seo-description" />
                <SaveBar onSave={saveS} saving={savingS} testid="seo-save-btn" />
            </div>
        </div>
    );
}

export function ComplianceEditor() {
    const [d, setD, save, saving] = useSection("compliance");
    const set = setKey(setD);
    return (
        <div className="space-y-6" data-testid="editor-compliance">
            <TextInput label="Hero Title" value={d.heroTitle} onChange={set("heroTitle")} testid="compliance-hero-title" />
            <AreaInput label="Hero Subtitle" value={d.heroSub} onChange={set("heroSub")} rows={2} testid="compliance-hero-sub" />
            <h3 className="pt-2 font-heading text-lg font-bold text-navy">Corporate Information</h3>
            <TextInput label="Corporate Identity Number (CIN)" value={d.cin} onChange={set("cin")} testid="compliance-cin" />
            <AreaInput label="Registered Office" value={d.registeredOffice} onChange={set("registeredOffice")} rows={2} testid="compliance-registered-office" />
            <AreaInput label="Corporate Office" value={d.corporateOffice} onChange={set("corporateOffice")} rows={2} testid="compliance-corporate-office" />
            <AreaInput label="Grievance Officer" value={d.grievanceOfficer} onChange={set("grievanceOfficer")} rows={3} testid="compliance-grievance-officer" />
            <h3 className="pt-2 font-heading text-lg font-bold text-navy">Policy Sections</h3>
            <ObjectList label="Policy Sections" items={d.sections} onChange={set("sections")} testid="compliance-sections" fields={[{ key: "id", label: "Section ID (lowercase, no spaces)" }, { key: "title", label: "Title" }, { key: "body", label: "Content", area: true }]} />
            <SaveBar onSave={save} saving={saving} testid="compliance-save-btn" />
        </div>
    );
}

const FAQ_CATS = ["general", "lap", "business"];

export function FaqManager() {
    const { faqs, refresh } = useSite();
    const [form, setForm] = useState({ question: "", answer: "", category: "general" });
    const [editing, setEditing] = useState(null);
    const [busy, setBusy] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
            if (editing) await api.put(`/faqs/${editing}`, form);
            else await api.post("/faqs", form);
            toast.success(editing ? "FAQ updated" : "FAQ added");
            setForm({ question: "", answer: "", category: "general" });
            setEditing(null);
            refresh();
        } catch (err) {
            toast.error("Save failed");
        } finally {
            setBusy(false);
        }
    };

    const remove = async (id) => {
        await api.delete(`/faqs/${id}`);
        toast.success("FAQ deleted");
        refresh();
    };

    return (
        <div className="space-y-8" data-testid="editor-faqs">
            <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-mist/50 p-6">
                <h3 className="font-heading text-base font-bold text-navy">{editing ? "Edit FAQ" : "Add FAQ"}</h3>
                <div>
                    <label className="field-label">Category</label>
                    <select className="field-input" data-testid="faq-category-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        {FAQ_CATS.map((c) => <option key={c} value={c}>{c === "lap" ? "Loan Against Property" : c === "business" ? "Business Loans" : "General"}</option>)}
                    </select>
                </div>
                <div>
                    <label className="field-label">Question</label>
                    <input className="field-input" data-testid="faq-question-input" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required />
                </div>
                <div>
                    <label className="field-label">Answer</label>
                    <textarea rows={3} className="field-input resize-y" data-testid="faq-answer-input" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required />
                </div>
                <div className="flex gap-3">
                    <button type="submit" disabled={busy} data-testid="faq-submit-btn" className="flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-heading text-sm font-bold text-white hover:bg-navy-light disabled:opacity-60">
                        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 text-gold" />}
                        {editing ? "Update FAQ" : "Add FAQ"}
                    </button>
                    {editing && (
                        <button type="button" onClick={() => { setEditing(null); setForm({ question: "", answer: "", category: "general" }); }} data-testid="faq-cancel-btn" className="rounded-lg border border-border px-6 py-3 text-sm font-semibold text-navy">
                            Cancel
                        </button>
                    )}
                </div>
            </form>
            <div className="space-y-3">
                {faqs.map((f) => (
                    <div key={f.faq_id} className="flex items-start justify-between gap-4 rounded-lg border border-border bg-white p-5" data-testid={`faq-row-${f.faq_id}`}>
                        <div>
                            <span className="rounded-full bg-navy/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-navy/60">{f.category}</span>
                            <p className="mt-2 font-heading text-sm font-bold text-navy">{f.question}</p>
                            <p className="mt-1 line-clamp-2 text-sm text-ink-soft">{f.answer}</p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <button onClick={() => { setEditing(f.faq_id); setForm({ question: f.question, answer: f.answer, category: f.category }); }} data-testid={`faq-edit-${f.faq_id}`} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-navy hover:bg-mist">Edit</button>
                            <button onClick={() => remove(f.faq_id)} data-testid={`faq-delete-${f.faq_id}`} className="rounded-lg border border-border px-3 py-2 text-red-600 hover:bg-red-50" aria-label="Delete FAQ"><Trash2 className="h-4 w-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const DL_CATS = ["Brochures", "Loan Forms", "Policies", "Interest Rate Sheets", "Company Profile", "General"];

export function DownloadsManager() {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState({ title: "", category: "General", description: "", file: null });
    const [busy, setBusy] = useState(false);

    const load = async () => {
        const r = await api.get("/downloads");
        setItems(r.data);
    };
    useEffect(() => { load(); }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!form.file) return toast.error("Please choose a file");
        setBusy(true);
        try {
            const fd = new FormData();
            fd.append("title", form.title);
            fd.append("category", form.category);
            fd.append("description", form.description);
            fd.append("file", form.file);
            await api.post("/downloads", fd, { headers: { "Content-Type": "multipart/form-data" } });
            toast.success("Document uploaded");
            setForm({ title: "", category: "General", description: "", file: null });
            e.target.reset();
            load();
        } catch (err) {
            toast.error(err.response?.data?.detail || "Upload failed");
        } finally {
            setBusy(false);
        }
    };

    const remove = async (id) => {
        await api.delete(`/downloads/${id}`);
        toast.success("Document deleted");
        load();
    };

    return (
        <div className="space-y-8" data-testid="editor-downloads">
            <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-mist/50 p-6">
                <h3 className="font-heading text-base font-bold text-navy">Upload Document</h3>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="field-label">Title</label>
                        <input className="field-input" data-testid="download-title-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                    </div>
                    <div>
                        <label className="field-label">Category</label>
                        <select className="field-input" data-testid="download-category-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                            {DL_CATS.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label className="field-label">Description</label>
                    <input className="field-input" data-testid="download-description-input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div>
                    <label className="field-label">File (PDF, JPG, PNG, WEBP — max 15MB)</label>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" data-testid="download-file-input" onChange={(e) => setForm({ ...form, file: e.target.files[0] })} className="block w-full text-sm text-ink-soft file:mr-4 file:rounded-lg file:border-0 file:bg-navy file:px-5 file:py-2.5 file:font-heading file:text-sm file:font-semibold file:text-white hover:file:bg-navy-light" />
                </div>
                <button type="submit" disabled={busy} data-testid="download-upload-btn" className="flex items-center gap-2 rounded-lg bg-navy px-6 py-3 font-heading text-sm font-bold text-white hover:bg-navy-light disabled:opacity-60">
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4 text-gold" />}
                    Upload
                </button>
            </form>
            <div className="space-y-3">
                {items.length === 0 && <p className="text-sm text-ink-soft" data-testid="downloads-empty">No documents uploaded yet.</p>}
                {items.map((d) => (
                    <div key={d.download_id} className="flex items-center justify-between gap-4 rounded-lg border border-border bg-white p-5" data-testid={`download-row-${d.download_id}`}>
                        <div>
                            <span className="rounded-full bg-navy/5 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-navy/60">{d.category}</span>
                            <p className="mt-2 font-heading text-sm font-bold text-navy">{d.title}</p>
                            <p className="text-xs text-ink-soft">{d.file_name}</p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <a href={`${process.env.REACT_APP_BACKEND_URL}${d.file_url}`} target="_blank" rel="noreferrer" data-testid={`download-view-${d.download_id}`} className="rounded-lg border border-border px-3 py-2 text-navy hover:bg-mist" aria-label="View file"><Download className="h-4 w-4" /></a>
                            <button onClick={() => remove(d.download_id)} data-testid={`download-delete-${d.download_id}`} className="rounded-lg border border-border px-3 py-2 text-red-600 hover:bg-red-50" aria-label="Delete document"><Trash2 className="h-4 w-4" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function InquiriesViewer() {
    const [items, setItems] = useState(null);

    const load = async () => {
        try {
            const r = await api.get("/inquiries");
            setItems(r.data);
        } catch (e) {
            setItems([]);
        }
    };
    useEffect(() => { load(); }, []);

    const markRead = async (id) => {
        await api.put(`/inquiries/${id}/read`);
        load();
    };
    const remove = async (id) => {
        await api.delete(`/inquiries/${id}`);
        load();
    };

    if (items === null) return <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-navy" /></div>;

    return (
        <div className="space-y-4" data-testid="inquiries-viewer">
            {items.length === 0 && <p className="rounded-lg border border-border bg-white p-8 text-center text-sm text-ink-soft" data-testid="inquiries-empty">No enquiries yet. New website enquiries will appear here.</p>}
            {items.map((q) => (
                <div key={q.inquiry_id} className={`rounded-lg border bg-white p-6 ${q.read ? "border-border" : "border-gold/50 shadow-sm"}`} data-testid={`inquiry-row-${q.inquiry_id}`}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-3">
                                <p className="font-heading text-base font-bold text-navy">{q.name}</p>
                                {!q.read && <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-xs font-bold text-gold-dark">New</span>}
                            </div>
                            <p className="mt-1 text-sm text-ink-soft">{q.company ? `${q.company} · ` : ""}{q.phone} · {q.email}</p>
                        </div>
                        <p className="text-xs text-ink-soft">{new Date(q.created_at).toLocaleString()}</p>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                        {q.funding_requirement && <span className="rounded-full bg-navy/5 px-3 py-1 font-semibold text-navy">{q.funding_requirement}</span>}
                    </div>
                    {q.message && <p className="mt-3 text-sm leading-relaxed text-ink-soft">{q.message}</p>}
                    <div className="mt-4 flex gap-2">
                        {!q.read && (
                            <button onClick={() => markRead(q.inquiry_id)} data-testid={`inquiry-read-${q.inquiry_id}`} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-navy hover:bg-mist">
                                <MailOpen className="h-3.5 w-3.5" /> Mark read
                            </button>
                        )}
                        <a href={`mailto:${q.email}`} data-testid={`inquiry-reply-${q.inquiry_id}`} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-navy hover:bg-mist">
                            <Mail className="h-3.5 w-3.5" /> Reply
                        </a>
                        <button onClick={() => remove(q.inquiry_id)} data-testid={`inquiry-delete-${q.inquiry_id}`} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50">
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
