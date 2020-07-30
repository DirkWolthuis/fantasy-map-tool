import { Machine } from "xstate";
import { assign } from "xstate";
import { marker } from "../Entities/Marker";

export const mapMachine = Machine({
  id: "map",
  type: "parallel",
  context: {
    markers: [],
  },
  states: {
    contentPane: {
      initial: "closed",
      states: {
        opened: {
          initial: "view",
          states: {
            view: {
              on: {
                EDIT_CONTENT: "edit",
              },
            },
            edit: {
              on: {
                VIEW_CONTENT: "view",
                SAVE_CONTENT: {
                  actions: assign({
                    markers: (context, event) =>
                      context.markers.map((marker) => {
                        if (marker.id === event.payload.id) {
                          return {
                            ...marker,
                            content: event.payload.content,
                            title: event.payload.title,
                          };
                        } else {
                          return marker;
                        }
                      }),
                  }),
                  target: "view",
                },
              },
            },
          },
          on: {
            CLOSE_CONTENT_PANE: {
              target: "closed",
            },
            DELETE_MARKER: {
              actions: assign({
                markers: (context, event) =>
                  context.markers.filter(
                    (marker) => marker.id !== event.payload.id
                  ),
              }),
              target: "closed",
            },
          },
        },
        closed: {
          on: {
            OPEN_CONTENT_PANE: {
              target: "opened",
              actions: assign({
                selectedMarkerId: (context, event) => event.payload,
              }),
            },
          },
        },
      },
    },

    map: {
      initial: "navigation",
      on: {
        LOAD_CONTEXT_FROM_STORAGE: {
          actions: assign((context, event) => ({ ...event.payload })),
        },
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
                  new marker(event.payload.lat, event.payload.lng),
                ],
              }),
            },
            MOVE_MARKER: {
              actions: assign({
                markers: (context, event) =>
                  context.markers.map((marker) => {
                    if (marker.id === event.payload.id) {
                      return {
                        ...marker,
                        lat: event.payload.lat,
                        lng: event.payload.lng,
                      };
                    } else {
                      return marker;
                    }
                  }),
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
    },
  },
});
