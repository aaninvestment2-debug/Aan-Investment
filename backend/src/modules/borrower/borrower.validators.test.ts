import { describe, expect, it } from "vitest";

import {
    createBorrowerSchema,
    promoterSchema,
    updatePromoterSchema,
} from "./borrower.validators";

/**
 * Mobile-number acceptance. The field is the one place a borrower record is
 * typed in by hand most often, so the rules are pinned here rather than left to
 * the regex to speak for itself: ten digits starting 6-9, `+91` optional,
 * spaces and hyphens tolerated and stripped.
 */

const ACCEPTED: Array<[input: string, stored: string]> = [
    ["9391070000", "9391070000"],
    ["9876543210", "9876543210"],
    ["6123456789", "6123456789"],
    ["7000000000", "7000000000"],
    ["8000000000", "8000000000"],
    // Leading/trailing whitespace is trimmed before the pattern is applied.
    ["  9391070000  ", "9391070000"],
    ["\t9391070000\n", "9391070000"],
    // Separators anywhere are dropped; +91 stays optional.
    ["93910 70000", "9391070000"],
    ["93910-70000", "9391070000"],
    ["+919391070000", "+919391070000"],
    ["+91 9391070000", "+919391070000"],
    ["+91-9391070000", "+919391070000"],
];

const REJECTED = [
    "1234567890", // does not start 6-9
    "5999999999", // does not start 6-9
    "987654321", // nine digits
    "98765432100", // eleven digits
    "", // blank
    "   ", // whitespace only
    "+9193910700", // +91 with a short number
    "9391O70000", // letter O instead of zero
    "+1 9391070000", // non-Indian country code
];

/** A minimal, otherwise-valid COMMERCIAL borrower payload. */
const commercialBorrower = (overrides: Record<string, unknown> = {}) => ({
    borrowerType: "COMMERCIAL" as const,
    borrowerCode: "B-001",
    name: "Acme Industries Pvt Ltd",
    constitution: "PRIVATE_LIMITED" as const,
    pan: "AAAAA9999A",
    dateOfIncorporation: "2010-04-01",
    businessCategory: "SMALL" as const,
    businessType: "MANUFACTURING" as const,
    classOfActivity1: "12345",
    addressLine1: "12 Industrial Estate",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    email: "ops@acme.example",
    phone: "9391070000",
    applicantType: "APPLICANT" as const,
    ...overrides,
});

describe("related person (promoter) phone", () => {
    it.each(ACCEPTED)("accepts %j and stores %j", (input, stored) => {
        const result = promoterSchema.safeParse({ name: "Asha Rao", phone: input });
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.phone).toBe(stored);
    });

    it.each(REJECTED)("rejects %j", (input) => {
        const result = promoterSchema.safeParse({ name: "Asha Rao", phone: input });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0]?.path).toEqual(["phone"]);
        }
    });

    it("leaves the phone optional", () => {
        expect(promoterSchema.safeParse({ name: "Asha Rao" }).success).toBe(true);
    });

    it("applies the same rule when editing an existing related person", () => {
        const accepted = updatePromoterSchema.safeParse({ phone: " 9391070000 " });
        expect(accepted.success).toBe(true);
        if (accepted.success) expect(accepted.data.phone).toBe("9391070000");

        expect(updatePromoterSchema.safeParse({ phone: "1234567890" }).success).toBe(
            false,
        );
    });

    it("still allows the phone to be cleared", () => {
        const result = updatePromoterSchema.safeParse({ phone: null });
        expect(result.success).toBe(true);
    });
});

describe("borrower phone", () => {
    it.each(ACCEPTED)("accepts %j on the borrower itself", (input, stored) => {
        const result = createBorrowerSchema.safeParse(
            commercialBorrower({ phone: input }),
        );
        expect(result.success).toBe(true);
        if (result.success) expect(result.data.phone).toBe(stored);
    });

    it.each(REJECTED)("rejects %j on the borrower itself", (input) => {
        const result = createBorrowerSchema.safeParse(
            commercialBorrower({ phone: input }),
        );
        expect(result.success).toBe(false);
    });

    it("accepts a related person's number inside the create payload", () => {
        const result = createBorrowerSchema.safeParse(
            commercialBorrower({
                promoters: [{ name: "Asha Rao", phone: "9391070000" }],
            }),
        );
        expect(result.success).toBe(true);
    });

    it("rejects a bad related-person number inside the create payload", () => {
        const result = createBorrowerSchema.safeParse(
            commercialBorrower({
                promoters: [{ name: "Asha Rao", phone: "1234567890" }],
            }),
        );
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues[0]?.path).toEqual(["promoters", 0, "phone"]);
        }
    });
});
