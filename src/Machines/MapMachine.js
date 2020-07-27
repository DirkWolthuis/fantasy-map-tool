import { Machine } from "xstate";

export const mapMachine = Machine({
  id: "map",
  initial: "navigation",
  states: {
    navigation: {
      on: {
        TO_MARKERS: "markers",
        TO_LAYERS: "layers",
      },
    },
    markers: {
      on: {
        TO_NAVIGATION: "navigation",
        TO_LAYERS: "layers",
      },
    },
    layers: {
      on: {
        TO_NAVIGATION: "navigation",
        TO_MARKERS: "markers",
      },
    },
  },
});
