// src/hooks/PhoneNumber.ts
export const PHONE_PREFIX = "+91";

export const sanitizePhone = (value: string) => {
  // remove spaces, dashes, parentheses
  return value.replace(/[^\d+]/g, "");
};

export const ensurePlus91 = (value: string) => {
  let v = sanitizePhone(value);
  // if it starts with 0 and then 10 digits, drop leading 0 then add +91
  if (/^0\d{10}$/.test(v)) {
    v = v.slice(1);
  }
  // if already 10 digits, add +91
  if (/^\d{10}$/.test(v)) {
    return `${PHONE_PREFIX}${v}`;
  }
  // if already starts with 91 and then 10 digits (no +)
  if (/^91\d{10}$/.test(v)) {
    return `+${v}`;
  }
  // if already +91xxxxxxxxxx
  if (/^\+91\d{10}$/.test(v)) {
    return v;
  }
  // else return sanitized as-is
  return v;
};

export const isValidIndianPhone = (value: string) => {
  const normalized = ensurePlus91(value);
  // valid pattern: +91 followed by exactly 10 digits, and first digit cannot be 0
  return /^\+91[1-9]\d{9}$/.test(normalized);
};
