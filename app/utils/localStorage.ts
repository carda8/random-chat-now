const AGREEMENT = "AGREEMENT";

const setLocalStorageAgreement = (value: "true" | "false") => {
  if (typeof window !== undefined) localStorage.setItem(AGREEMENT, value);
};

const getLocalStorageAgreement = () => {
  if (typeof window !== undefined) return localStorage.getItem(AGREEMENT);
};

export { setLocalStorageAgreement, getLocalStorageAgreement };
