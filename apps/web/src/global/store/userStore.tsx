import { create } from "zustand";
import { UserInterface } from "@repo/types/src/User";

interface UserStore {
  user: UserInterface | null;
  setUser: (user: UserInterface) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user: UserInterface) => {
    set({ user: user });
  },
}));
