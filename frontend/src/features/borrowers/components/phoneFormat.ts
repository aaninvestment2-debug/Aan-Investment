/**
 * Phone-number input handling, shared by every borrower field that takes one.
 *
 * Kept out of borrowerFormShared.tsx so that file keeps exporting components
 * only (fast refresh), and separate from the pattern constant so both the
 * borrower master fields and the related-person rows normalize identically.
 */

/**
 * Strips spaces and hyphens from a phone number as it is typed or pasted, so
 * " 9391070000", "93910 70000" and "+91-93910-70000" all become the canonical
 * form the field's `pattern` and the backend validator expect. Mirrors
 * `normaliseMobile` in backend/src/modules/borrower/borrower.validators.ts.
 *
 * Nothing else is touched: digits, the +91 prefix and anything invalid are
 * left exactly as entered, so validation still has something to reject rather
 * than the field silently rewriting what someone typed.
 */
export function normalizePhoneInput(value: string): string {
  return value.replace(/[\s-]/g, "");
}
