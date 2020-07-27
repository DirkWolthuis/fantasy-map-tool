import { Machine } from "xstate";
import { assign } from "xstate";

export const mapMachine = Machine({
  id: "map",
  initial: "navigation",
  context: {
    markers: [
      // {
      //   id: 1,
      //   position: [1500, 2500],
      //   text: "Test marker",
      // },
      // {
      //   id: 2,
      //   position: [1650, 2500],
      //   text: "Test marker",
      // },
      // {
      //   id: 3,
      //   position: [1750, 2500],
      //   text: "Test marker",
      // },
      // {
      //   id: 4,
      //   position: [1730, 2500],
      //   text: "Test marker",
      // },
    ],
  },
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
        ADD_MARKER: {
          actions: assign({
            markers: (context, event) => [
              ...context.markers,
              {
                id: 5,
                position: event.payload,
                text: "Hello",
              },
            ],
          }),
        },
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
