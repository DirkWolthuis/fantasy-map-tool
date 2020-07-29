import React, { useRef, useState, useEffect } from "react";
import { useMapMachine } from "../../Stores/useMapMachine";
//import { useOutsideElementListner } from "../../Hooks/useOutsideElementListner";

const ContentPane = () => {
  const [selectedMarker, setSelectedMarker] = useState();
  const [state, send] = useMapMachine();
  const ref = useRef();

  const closeContentPane = () => {
    send({ type: "CLOSE_CONTENT_PANE" });
  };

  //useOutsideElementListner(closeContentPane, ref);

  useEffect(() => {
    if (state.context.selectedMarkerId) {
      setSelectedMarker(
        state.context.markers.find(
          (marker) => marker.id === state.context.selectedMarkerId
        )
      );
    }
  }, [state]);

  if (state.matches("contentPane.opend")) {
  }

  return (
    <div
      ref={ref}
      style={{
        width: state.matches("contentPane.opened") ? "60vw" : "0px",
        maxWidth: "700px",
      }}
      className="fixed right-0 top-0 bottom-0 flex items-center z-1 bg-white shadow transition-all duration-500 ease-in-out"
    >
      selected marker: {selectedMarker && selectedMarker.id}
    </div>
  );
};

export default ContentPane;
