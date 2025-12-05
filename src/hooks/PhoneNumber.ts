export const PHONE_PREFIX = "+91";
export const sanitizePhone = (value: string) => {
  return value.replace(/[^\d+]/g, "");
};
export const ensurePlus91 = (value: string) => {
  let v = sanitizePhone(value);
  if (/^0\d{10}$/.test(v)) {
    v = v.slice(1);
  }
  if (/^\d{10}$/.test(v)) {
    return `${PHONE_PREFIX}${v}`;
  }
  if (/^91\d{10}$/.test(v)) {
    return `+${v}`;
  }
  if (/^\+91\d{10}$/.test(v)) {
    return v;
  }
  return v;
};
export const isValidIndianPhone = (value: string) => {
  const normalized = ensurePlus91(value);
  return /^\+91[1-9]\d{9}$/.test(normalized);
};
