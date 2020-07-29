import { createStore } from "reusable";
import { useMachine } from "@xstate/react";
import { mapMachine } from "../Machines/MapMachine";
import { useEffect } from "react";
import {
  saveLocalstorage,
  loadLocalstorage,
} from "../Services/LocalStorageService";

export const useMapMachine = createStore(() => {
  const [state, send] = useMachine(mapMachine);

  useEffect(() => {
    const prevStorage = loadLocalstorage("DND_MAP_TOOL");
    if (prevStorage) {
      send({ type: "LOAD_CONTEXT_FROM_STORAGE", payload: prevStorage });
    }
  }, []);

  useEffect(() => {
    saveLocalstorage("DND_MAP_TOOL", state.context);
  }, [state.context]);

  return [state, send];
});
