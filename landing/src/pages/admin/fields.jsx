import { useState } from "react";
import { Plus, Trash2, Loader2, Save } from "lucide-react";

export const TextInput = ({ label, value, onChange, testid, placeholder = "" }) => (
    <div>
        <label className="field-label">{label}</label>
        <input className="field-input" data-testid={testid} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    </div>
);

export const AreaInput = ({ label, value, onChange, rows = 4, testid }) => (
    <div>
        <label className="field-label">{label}</label>
        <textarea className="field-input resize-y" rows={rows} data-testid={testid} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
);

export const StringList = ({ label, items, onChange, testid }) => (
    <div data-testid={testid}>
        <label className="field-label">{label}</label>
        <div className="space-y-2">
            {items.map((item, i) => (
                <div key={i} className="flex gap-2">
                    <input className="field-input" data-testid={`${testid}-item-${i}`} value={item} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
                    <button type="button" data-testid={`${testid}-remove-${i}`} onClick={() => onChange(items.filter((_, j) => j !== i))} className="rounded-lg border border-border px-3 text-red-600 hover:bg-red-50" aria-label="Remove item">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ))}
            <button type="button" data-testid={`${testid}-add`} onClick={() => onChange([...items, ""])} className="flex items-center gap-2 rounded-lg border border-dashed border-navy/30 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-mist">
                <Plus className="h-4 w-4" /> Add item
            </button>
        </div>
    </div>
);

export const ObjectList = ({ label, items, fields, onChange, testid }) => (
    <div data-testid={testid}>
        <label className="field-label">{label}</label>
        <div className="space-y-4">
            {items.map((item, i) => (
                <div key={i} className="rounded-lg border border-border bg-mist/50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="font-heading text-xs font-bold uppercase tracking-widest text-navy/50">Item {i + 1}</span>
                        <button type="button" data-testid={`${testid}-remove-${i}`} onClick={() => onChange(items.filter((_, j) => j !== i))} className="text-red-600 hover:text-red-800" aria-label="Remove">
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {fields.map((f) => (
                            <div key={f.key}>
                                <label className="mb-1 block text-xs font-semibold text-ink-soft">{f.label}</label>
                                {f.area ? (
                                    <textarea rows={2} className="field-input resize-y" data-testid={`${testid}-${i}-${f.key}`} value={item[f.key] || ""} onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, [f.key]: e.target.value } : x)))} />
                                ) : (
                                    <input className="field-input" data-testid={`${testid}-${i}-${f.key}`} value={item[f.key] || ""} onChange={(e) => onChange(items.map((x, j) => (j === i ? { ...x, [f.key]: e.target.value } : x)))} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button
                type="button"
                data-testid={`${testid}-add`}
                onClick={() => onChange([...items, Object.fromEntries(fields.map((f) => [f.key, ""]))])}
                className="flex items-center gap-2 rounded-lg border border-dashed border-navy/30 px-4 py-2.5 text-sm font-semibold text-navy hover:bg-mist"
            >
                <Plus className="h-4 w-4" /> Add item
            </button>
        </div>
    </div>
);

export const SaveBar = ({ onSave, saving, testid }) => (
    <div className="sticky bottom-4 mt-8 flex justify-end">
        <button
            onClick={onSave}
            disabled={saving}
            data-testid={testid || "save-section-btn"}
            className="flex items-center gap-2 rounded-lg bg-navy px-8 py-3.5 font-heading text-sm font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-light disabled:opacity-60"
        >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 text-gold" />}
            {saving ? "Saving…" : "Save Changes"}
        </button>
    </div>
);
