import { produce } from 'immer';
import { create } from 'zustand';

interface ListState {
  spin: boolean;
  setSpinState: () => void;
  msgT: string;
  setMsgT: (params: string) => void;
}

const useStore = create<ListState>((set) => ({
  spin: false,
  msgT: '',
  setMsgT: async (msg: string) => {
    set(
      produce((state) => {
        state.msgT = msg;
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
