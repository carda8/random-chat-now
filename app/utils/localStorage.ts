const AGREEMENT = "AGREEMENT";

const setLocalStorageAgreement = (value: "true" | "false") => {
  if (typeof window !== undefined) localStorage.setItem(AGREEMENT, value);
};

const getLocalStorageAgreement = () => {
  if (typeof window !== undefined) {
    const res = localStorage.getItem(AGREEMENT);
    return res && res === "true" ? "true" : "false";
  }
};

export { setLocalStorageAgreement, getLocalStorageAgreement };
