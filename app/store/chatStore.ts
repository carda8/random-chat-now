import { create } from "zustand";
interface RoomInfo {
  roomId: string;
  users: string[];
}

export interface Message {
  sender: string;
  createdAt: Date;
  message: string;
  roomInfo: RoomInfo;
}

interface State {
  messages: Message[];
  inputText: string;
  isLoading: boolean;
  isPartnerLeft: boolean;
  roomInfo: RoomInfo;
  isInputDisabled: boolean;
}

interface Action {
  updateInputText: (inputText: State["inputText"]) => void;
  updateIsLoading: (isLoading: State["isLoading"]) => void;
  updateMessages: (messages: Message) => void;
  updateRoomInfo: (room: State["roomInfo"]) => void;
  updateIsPartnerLeft: (isLeft: State["isPartnerLeft"]) => void;
  updateIsInputDisabled: (isInputDisabled: State["isInputDisabled"]) => void;
  reset: () => void;
}

const initialState: State = {
  inputText: "",
  isLoading: false,
  messages: [],
  roomInfo: { users: [], roomId: "" },
  isPartnerLeft: false,
  isInputDisabled: false,
};

// Create your store, which includes both state and (optionally) actions
export const useChatStore = create<State & Action>()((set) => ({
  ...initialState,
  updateInputText: (inputText) => set(() => ({ inputText })),
  updateIsLoading: (isLoading) => set(() => ({ isLoading })),
  updateMessages: (newMessage) =>
    set((state) => ({ messages: [...state.messages, newMessage] })),
  updateRoomInfo: (roomInfo) => set(() => ({ roomInfo })),
  updateIsPartnerLeft: (isLeft) =>
    set(() => ({
      isPartnerLeft: isLeft,
    })),
  updateIsInputDisabled: (isInputDisabled) => set(() => ({ isInputDisabled })),
  reset: () => {
    set(initialState);
  },
}));
