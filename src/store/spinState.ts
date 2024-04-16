import { produce } from 'immer';
import { create } from 'zustand';

interface ListState {
  spin: boolean;
  setSpinState: () => void;
  msgT: msgType;
  setMsgT: (params: msgType) => void;
}
interface msgType {
  isOpen?: number;
  type: string;
  content: string;
}
const useStore = create<ListState>((set) => ({
  spin: false,
  msgT: { type: 'info', content: 'loading...', isOpen: 0 },
  setMsgT: async ({ type, content }) => {
    set(
      produce((state) => {
        state.msgT.type = type;
        state.msgT.content = content;
        state.msgT.isOpen++;
      }),
    );
  },
  setSpinState: async () => {
    try {
      set(
        produce((state) => {
          state.spin = !state.spin;
        }),
      );
    } catch {
      /* empty */
    }
  },
}));

export default useStore;
