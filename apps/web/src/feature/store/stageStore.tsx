import { create } from "zustand";

type Stage = "welcome" | "chatting";

interface StageStore {
  stage: Stage;
  setStage: (newStage: Stage) => void;
}

export const useStageStore = create<StageStore>((set) => ({
  stage: "welcome",
  setStage: (newStage: Stage) => set({ stage: newStage }),
}));
