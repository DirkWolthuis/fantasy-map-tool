import { createStore } from "reusable";
import { useMachine } from "@xstate/react";
import { mapMachine } from "../Machines/MapMachine";

export const useMapMachine = createStore(() => {
  const [state, send] = useMachine(mapMachine);
  return [state, send];
});
