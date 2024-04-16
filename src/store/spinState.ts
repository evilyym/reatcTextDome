import { produce } from 'immer';
import { create } from 'zustand';

interface ListState {
  spin: boolean;
  setSpinState: () => void;
}

const useStore = create<ListState>((set) => ({
  spin: false,
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
