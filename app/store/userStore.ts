import { create } from "zustand";
interface State {
  agreement: "true" | "false";
}

interface Action {
  updateAgreement: (agreement: State["agreement"]) => void;
  reset: () => void;
}

const initialState: State = {
  agreement: "false",
};

// Create your store, which includes both state and (optionally) actions
export const useUserStore = create<State & Action>()((set) => ({
  ...initialState,
  updateAgreement: (agreement) => set(() => ({ agreement })),
  reset: () => {
    set(initialState);
  },
}));
