import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import api from "@/lib/api";

const REQUIREMENTS = ["₹5 – 25 Crore", "₹25 – 50 Crore", "₹50 – 100 Crore", "Above ₹100 Crore", "To be discussed"];

export default function InquiryForm() {
    const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", funding_requirement: "", message: "", website: "" });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

    const validate = () => {
        const errs = {};
        if (form.name.trim().length < 2) errs.name = "Please enter your full name";
        if (!/^[0-9+\-\s]{8,16}$/.test(form.phone.trim())) errs.phone = "Please enter a valid phone number";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Please enter a valid email address";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setSubmitting(true);
        try {
            await api.post("/inquiries", form);
            toast.success("Thank you. A senior member of our credit team will contact you.");
            setForm({ name: "", company: "", phone: "", email: "", funding_requirement: "", message: "", website: "" });
        } catch (err) {
            toast.error(err.response?.data?.detail || "Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form onSubmit={submit} data-testid="inquiry-form" className="space-y-5" noValidate>
            <input type="text" name="website" value={form.website} onChange={set("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="inq-name" className="field-label">Name *</label>
                    <input id="inq-name" data-testid="inquiry-name-input" className="field-input" value={form.name} onChange={set("name")} placeholder="Your full name" />
                    {errors.name && <p className="field-error" data-testid="inquiry-name-error">{errors.name}</p>}
                </div>
                <div>
                    <label htmlFor="inq-company" className="field-label">Company</label>
                    <input id="inq-company" data-testid="inquiry-company-input" className="field-input" value={form.company} onChange={set("company")} placeholder="Company / firm name" />
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                    <label htmlFor="inq-phone" className="field-label">Phone *</label>
                    <input id="inq-phone" data-testid="inquiry-phone-input" className="field-input" value={form.phone} onChange={set("phone")} placeholder="+91" />
                    {errors.phone && <p className="field-error" data-testid="inquiry-phone-error">{errors.phone}</p>}
                </div>
                <div>
                    <label htmlFor="inq-email" className="field-label">Email *</label>
                    <input id="inq-email" type="email" data-testid="inquiry-email-input" className="field-input" value={form.email} onChange={set("email")} placeholder="you@company.com" />
                    {errors.email && <p className="field-error" data-testid="inquiry-email-error">{errors.email}</p>}
                </div>
            </div>
            <div>
                <label htmlFor="inq-requirement" className="field-label">Funding Requirement</label>
                <select id="inq-requirement" data-testid="inquiry-requirement-select" className="field-input" value={form.funding_requirement} onChange={set("funding_requirement")}>
                    <option value="">Select indicative range</option>
                    {REQUIREMENTS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="inq-message" className="field-label">Message</label>
                <textarea id="inq-message" rows={4} data-testid="inquiry-message-input" className="field-input resize-none" value={form.message} onChange={set("message")} placeholder="A brief outline of your requirement" />
            </div>
            <button
                type="submit"
                data-testid="inquiry-submit-btn"
                disabled={submitting}
                className="group flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-8 py-4 font-heading text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-light disabled:opacity-60 md:w-auto"
            >
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {submitting ? "Submitting…" : "Submit Enquiry"}
                {!submitting && <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
            </button>
        </form>
    );
}
